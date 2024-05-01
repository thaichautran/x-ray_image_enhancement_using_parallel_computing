
import cv2 # type: ignore
import io
from tkinter import Image
from flask import Flask, request, jsonify
import numpy as np
import base64
from PIL import Image
import matplotlib.pyplot as plt
from collections import OrderedDict
from joblib import Parallel, delayed

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

#CLAHE FUNCTION
#ALL UTILITY FUNCTIONS COMBINED INTO ONE FUNCTION
#CLAHE FUNCTION, ALL UTILITY FUNCTIONS COMBINED INTO ONE FUNCTION
def clahe(img,clipLimit, tile=32):
    '''img - Input image
       clipLimit - Normalized clipLimit. Higher value gives more contrast
       nBins - Number of graylevel bins for histogram("dynamic range")
       nX - Number of contextual regions in X direction
       nY - Number of contextual regions in Y direction'''
    if clipLimit==1:
        return

    h, w = img.shape
    
    # pixel xám trong python có 256 giá trị từ 0 đến 255
    nBins=256

    #Taking dimensions of each contextual region to be a square of 32X32
    xsz = tile
    ysz = tile

    # nX và nY là số ô có kích thước xsz * ysz trong ảnh kết quả.

    nX = np.ceil(h/xsz).astype(int)#240
    nY = np.ceil(w/ysz).astype(int)#320

    #Excess number of pixels to get an integer value of nX and nY
    nX = int(np.ceil(h/xsz))#240
    nY = int(np.ceil(w/ysz))#320

    # Tính phần bị thiếu nếu như chia ảnh thành các ô theo kích thước xsz và ysz
    excX = int(xsz*(nX-h/xsz))
    excY = int(ysz*(nY-w/ysz))

    # Thêm các phần tử '0' vào mảng img dựa trên giá trị excX và excY vừa tính để đạt đủ kích thước cho nX * nY ô
    if excX!=0:
        img = np.append(img, np.zeros((excX, img.shape[1]), dtype=int), axis=0)
    if excY!=0:
        img = np.append(img,np.zeros((img.shape[0],excY)).astype(int),axis=1)
        img = np.append(img, np.zeros((img.shape[0], excY), dtype=int), axis=1)


    # Tính số lượng pixel cần xử lý tính toán
    nPixels = xsz*ysz
    clahe_img = np.zeros(img.shape)

    if clipLimit <= 0:
        clipLimit = 40
    else:
        clipLimit = max(1, clipLimit)

    #makeLUT
    print("...Make the LUT...")
    minVal = np.min(img)
    maxVal = np.max(img)

    binSz = np.floor(1+(maxVal-minVal)/float(nBins))
    LUT = np.floor((np.arange(minVal,maxVal+1)-minVal)/float(binSz))

    #BACK TO CLAHE
    bins = LUT[img]
    print(bins.shape)

    #makeHistogram

    # Tạo mảng hist lưu giá trị histogram cho từng ô
    print("...Making the Histogram...")
    hist = np.zeros((nX,nY,nBins))
    print(nX,nY,hist.shape)
    for i in range(nX):
        for j in range(nY):
            bin_ = bins[i*xsz:(i+1)*xsz,j*ysz:(j+1)*ysz].astype(int)
            for i1 in range(xsz):
                for j1 in range(ysz):
                    hist[i,j,bin_[i1,j1]]+=1

    #clipHistogram
    print("...Clipping the Histogram...")
    for i in range(nX):
        for j in range(nY):
            # Tính toán số lượng bit bị cắt
            nExcess = 0
            for n in range(nBins):
                excess = hist[i,j,n] - clipLimit
                if excess>0:
                    nExcess += excess

            binIncr = nExcess/nBins
            upper = clipLimit - binIncr
            # Giới hạn sao cho hist của 1 giá trị bins bất kỳ không vượt quá clipLimit
            for n in range(nBins):
                if hist[i,j,n] > clipLimit:
                    hist[i,j,n] = clipLimit
                else:
                    if hist[i,j,n]>upper:
                        nExcess += upper - hist[i,j,n]
                        hist[i,j,n] = clipLimit
                    else:
                        nExcess -= binIncr
                        hist[i,j,n] += binIncr

            if nExcess > 0:
                stepSz = max(1,np.floor(1+nExcess/nBins))
                for n in range(nBins):
                    nExcess -= stepSz
                    hist[i,j,n] += stepSz
                    if nExcess < 1:
                        break

    #mapHistogram
    # Giống như tạo mảng giá trị cdf
    #mapHistogram. Giống như tạo mảng giá trị cdf
    print("...Mapping the Histogram...")
    map_ = np.zeros((nX,nY,nBins))
    #print(map_.shape)
    scale = (maxVal - minVal)/float(nPixels)
    for i in range(nX):
        for j in range(nY):
            sum_ = 0
            for n in range(nBins):
                sum_ += hist[i,j,n]
                map_[i,j,n] = np.floor(min(minVal+sum_*scale,maxVal))

    #BACK TO CLAHE
    #INTERPOLATION
    print("...interpolation...")
    xI = 0
    for i in range(nX+1):
        if i==0:
            subX = int(xsz/2)
            xU = 0
            xB = 0
        elif i==nX:
            subX = int(xsz/2)
            xU = nX-1
            xB = nX-1
        else:
            subX = xsz
            xU = i-1
            xB = i

        yI = 0
        for j in range(nY+1):
            if j==0:
                subY = int(ysz/2)
                yL = 0
                yR = 0
            elif j==nY:
                subY = int(ysz/2)
                yL = nY-1
                yR = nY-1
            else:
                subY = ysz
                yL = j-1
                yR = j
            LU = map_[xU,yL,:]
            RU = map_[xU,yR,:]
            LB = map_[xB,yL,:]
            RB = map_[xB,yR,:]
            #print("CLAHE vals...")
            subBin = bins[xI:xI+subX,yI:yI+subY]
            #print("clahe subBin shape: ",subBin.shape)
            subImage = np.zeros(subBin.shape)
            num = subX*subY
            for a in range(subX):
                inverseA = subX-a
                for b in range(subY):
                    inverseB = subY-b
                    val = subBin[a,b].astype(int)
                    subImage[a,b] = np.floor((inverseA*(inverseB*LU[val] + b*RU[val])+ a*(inverseB*LB[val] + b*RB[val]))/float(num))
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


def run(image):
    processed_images_list = []
=======
# Thử nghiệm song song. Xử lý 1 ảnh và trả về kết quả là list chứa các ảnh với clipLimit khác nhau.
def run(image):

def run(images, clip_limit = 8):

    processed_images = []
    if len(image.shape) > 2:
        image = to_grayscale(image)

    normalized_image = normalize(np.min(image), np.max(image), 0, 255, image)


    for i in range(4, 64, 4):
        equalized_image = clahe(img=normalized_image, clipLimit=i)
        processed_images_list.append(equalized_image)

    return processed_images_list

    # Sử dụng Parallel và delayed để chạy vòng for song song
    results = Parallel(n_jobs=-1)(delayed(clahe)(img=normalized_image, clipLimit=i) for i in range(4, 64, 4))
    processed_images.extend(results)

    return processed_images


app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/convert', methods=['POST'])
def convert_images():
    if 'images' not in request.files:
        return jsonify({'error': 'No images provided'}), 400
    
    images = request.files.getlist('images')
    clip_limit = float(request.form.get('clip_limit', 8))
    
    try:
        processed_images = []
        for img_file in images:
            # Đọc dữ liệu từ file ảnh và chuyển đổi thành mảng numpy
            img_data = np.frombuffer(img_file.read(), np.uint8)
            image = cv2.imdecode(img_data, cv2.IMREAD_COLOR)
            processed_images.append(image)

        processed_images = run(processed_images, clip_limit)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
    base64_images = []
    for image in processed_images:
        image = image.astype(np.uint8)
        image_data = Image.fromarray(image)
        buffer = io.BytesIO()
        image_data.save(buffer, format='JPEG')
        base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
        base64_images.append(base64_image)

    return jsonify({'data': base64_images}), 200
    
if __name__ == '__main__':
    app.run(debug=True)

