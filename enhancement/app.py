import numpy as np
import cv2
import os
import time
import matplotlib.pyplot as plt
from skimage import io

from collections import OrderedDict

# window_size = 128
# clip_limit = 100
# n_iter = 1

# Chuẩn hóa lại val theo khoảng giá trị mới
def normalize(min_old, max_old, min_new, max_new, val):
	'''Normalizes values to the interval [min_new, max_new]

	Parameters:
		min_old: min value from old base.
		max_old: max value from old base.
		min_new: min value from new base.
		max_new: max value from new base.
		val: float or array-like value to be normalized.
	'''

	ratio = (val - min_old) / (max_old - min_old)
	normalized = (max_new - min_new) * ratio + min_new
	return normalized.astype(np.uint8)

# Chuyển image sang ảnh xám.
def to_grayscale(image):
	# red_v, green_v và blue_v là các mảng 2D chứa giá trị kênh màu
	red_v = image[:, :, 0] * 0.299
	green_v = image[:, :, 1] * 0.587
	blue_v = image[:, :, 2] * 0.144
	image = red_v + green_v + blue_v

	return image.astype(np.uint8)

#INTERPOLATION FUNCTION
def interpolate(subBin,LU,RU,LB,RB,subX,subY):
    subImage = np.zeros(subBin.shape)
    num = subX*subY
    for i in range(subX):
        inverseI = subX-i
        for j in range(subY):
            inverseJ = subY-j
            val = subBin[i,j].astype(int)
            subImage[i,j] = np.floor((inverseI*(inverseJ*LU[val] + j*RU[val])+ i*(inverseJ*LB[val] + j*RB[val]))/float(num))
    return subImage

#CLAHE FUNCTION
#ALL UTILITY FUNCTIONS COMBINED INTO ONE FUNCTION
def clahe(img,clipLimit):
    '''img - Input image
       clipLimit - Normalized clipLimit. Higher value gives more contrast
       nrBins - Number of graylevel bins for histogram("dynamic range")
       nrX - Number of contextual regions in X direction
       nrY - Number of contextual regions in Y direction'''
    if clipLimit==1:
        return

    h, w = img.shape
    nrBins = 256
    #Taking dimensions of each contextial region to be a square of 32X32
    xsz = 32
    ysz = 32
    nrX = np.ceil(h/xsz).astype(int)#240
    nrY = np.ceil(w/ysz).astype(int)#320
    #Excess number of pixels to get an integer value of nrX and nrY
    excX= int(xsz*(nrX-h/xsz))
    excY= int(ysz*(nrY-w/ysz))
    #Pad that number of pixels to the image
    if excX!=0:
        img = np.append(img,np.zeros((excX,img.shape[1])).astype(int),axis=0)
    if excY!=0:
        img = np.append(img,np.zeros((img.shape[0],excY)).astype(int),axis=1)
    
    nrPixels = xsz*ysz
    # xsz2 = round(xsz/2)
    # ysz2 = round(ysz/2)
    clahe_img = np.zeros(img.shape)
    
    if clipLimit > 0:
        clipLimit = max(1,clipLimit*xsz*ysz/nrBins)
    else:
        clipLimit = 50
    
    #makeLUT
    print("...Make the LUT...")
    minVal = 0 #np.min(img)
    maxVal = 255 #np.max(img)
    
    #maxVal1 = maxVal + np.maximum(np.array([0]),minVal) - minVal
    #minVal1 = np.maximum(np.array([0]),minVal)
    
    binSz = np.floor(1+(maxVal-minVal)/float(nrBins))
    LUT = np.floor((np.arange(minVal,maxVal+1)-minVal)/float(binSz))
    
    #BACK TO CLAHE
    bins = LUT[img]
    print(bins.shape)
    #makeHistogram
    print("...Making the Histogram...")
    hist = np.zeros((nrX,nrY,nrBins))
    print(nrX,nrY,hist.shape)
    for i in range(nrX):
        for j in range(nrY):
            bin_ = bins[i*xsz:(i+1)*xsz,j*ysz:(j+1)*ysz].astype(int)
            for i1 in range(xsz):
                for j1 in range(ysz):
                    hist[i,j,bin_[i1,j1]]+=1
    
    #clipHistogram
    print("...Clipping the Histogram...")
    if clipLimit>0:
        for i in range(nrX):
            for j in range(nrY):
                nrExcess = 0
                for nr in range(nrBins):
                    excess = hist[i,j,nr] - clipLimit
                    if excess>0:
                        nrExcess += excess
                
                binIncr = nrExcess/nrBins
                upper = clipLimit - binIncr
                for nr in range(nrBins):
                    if hist[i,j,nr] > clipLimit:
                        hist[i,j,nr] = clipLimit
                    else:
                        if hist[i,j,nr]>upper:
                            nrExcess += upper - hist[i,j,nr]
                            hist[i,j,nr] = clipLimit
                        else:
                            nrExcess -= binIncr
                            hist[i,j,nr] += binIncr
                
                if nrExcess > 0:
                    stepSz = max(1,np.floor(1+nrExcess/nrBins))
                    for nr in range(nrBins):
                        nrExcess -= stepSz
                        hist[i,j,nr] += stepSz
                        if nrExcess < 1:
                            break
    
    #mapHistogram
    print("...Mapping the Histogram...")
    map_ = np.zeros((nrX,nrY,nrBins))
    #print(map_.shape)
    scale = (maxVal - minVal)/float(nrPixels)
    for i in range(nrX):
        for j in range(nrY):
            sum_ = 0
            for nr in range(nrBins):
                sum_ += hist[i,j,nr]
                map_[i,j,nr] = np.floor(min(minVal+sum_*scale,maxVal))
    
    #BACK TO CLAHE
    #INTERPOLATION
    print("...interpolation...")
    xI = 0
    for i in range(nrX+1):
        if i==0:
            subX = int(xsz/2)
            xU = 0
            xB = 0
        elif i==nrX:
            subX = int(xsz/2)
            xU = nrX-1
            xB = nrX-1
        else:
            subX = xsz
            xU = i-1
            xB = i
        
        yI = 0
        for j in range(nrY+1):
            if j==0:
                subY = int(ysz/2)
                yL = 0
                yR = 0
            elif j==nrY:
                subY = int(ysz/2)
                yL = nrY-1
                yR = nrY-1
            else:
                subY = ysz
                yL = j-1
                yR = j
            UL = map_[xU,yL,:]
            UR = map_[xU,yR,:]
            BL = map_[xB,yL,:]
            BR = map_[xB,yR,:]
            #print("CLAHE vals...")
            subBin = bins[xI:xI+subX,yI:yI+subY]
            #print("clahe subBin shape: ",subBin.shape)
            subImage = interpolate(subBin,UL,UR,BL,BR,subX,subY)
            clahe_img[xI:xI+subX,yI:yI+subY] = subImage
            yI += subY
        xI += subX
    
    if excX==0 and excY!=0:
        return clahe_img[:,:-excY]
    elif excX!=0 and excY==0:
        return clahe_img[:-excX,:]
    elif excX!=0 and excY!=0:
        return clahe_img[:-excX,:-excY]
    else:
        return clahe_img

def run(images, clip_limit):
    processed_images = []
    for image in images:
        if len(image.shape) > 2:
            image = to_grayscale(image)

        # Giới hạn kích thước 1 chiều tối đa của ảnh là 1024
        if max(image.shape[:2]) > 1024:
            # Tính tỉ lệ resize
            scale = 1024 / max(image.shape[:2])
            # Kích thước mới sau resize
            new_size = (int(image.shape[1] * scale), int(image.shape[0] * scale))
            # Resize ảnh
            resized_image = cv2.resize(image, new_size)
        else:
            resized_image = image

        normalized_image = normalize(np.min(resized_image), np.max(resized_image), 0, 255, resized_image)

        equalized_image = clahe(img=normalized_image, clipLimit=clip_limit)
        processed_images.append(equalized_image)

    return processed_images

# Đọc và trả về danh sách ảnh theo đường dẫn
def read_images_from_fraction_directory(dir_path): 
    images = []

    # Duyệt qua tất cả các tệp trong thư mục fraction
    for filename in os.listdir(dir_path):
        filepath = os.path.join(dir_path, filename)
        # Kiểm tra xem tệp có phải là một tệp ảnh không
        if os.path.isfile(filepath) and any(filename.endswith(ext) for ext in ['.jpg', '.jpeg', '.png']):
            # Đọc ảnh bằng OpenCV
            image = cv2.imread(filepath)
            # Thêm ảnh vào danh sách nếu đọc thành công
            if image is not None:
                images.append(image)

    return images

fraction_dir = "data/fraction/images"  # Đường dẫn đến thư mục fraction
# Sử dụng hàm để đọc ảnh từ thư mục fraction
images = read_images_from_fraction_directory(fraction_dir)
# Đo thời gian chạy của hàm gốc
start_time = time.time()
processed_images = run(images=images, clip_limit=8)
end_time = time.time()
print("Execution time of sum_array:", end_time - start_time)
