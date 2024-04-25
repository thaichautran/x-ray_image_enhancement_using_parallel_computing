import numpy as np
import cv2 # type: ignore

from collections import OrderedDict

window_size = 128
clip_limit = 100
n_iter = 1

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

# Trả về mảng value là tần suất và mảng key là các pixel
def histogram(data):
	'''Generates the histogram for the given data.

	Parameters:
		data: data to make the histogram.

	Returns: histogram, bins.
	'''

	# Trích xuất các giá trị duy nhất từ dữ liệu và số lần xuất hiện tương ứng của mỗi giá trị.
	pixels, count = np.unique(data, return_counts=True)
	# Tạo 1 từ điển (Gần giống Map, nhưng từ điển thì được xếp theo thứ tự).
	hist = OrderedDict()

	# Xếp các pixel khác nhau theo thứ tự từ pixels[0] đến hết vào hist.
	for i in range(len(pixels)):
		hist[pixels[i]] = count[i]

	# Trả về mảng value và mảng key.
	return np.array(list(hist.values())), np.array(list(hist.keys()))

# Trả lại mảng tích lũy thu được từ hist.
def calculate_cdf(hist, bins):
	'''Calculates the normalized CDF (Cumulative Distribution Function)
	for the histogram.

	Parameters:
		hist: frequencies of each pixel.
		bins: pixels.

	Returns the CDF in a dictionary.
	'''

	# Calculating probability for each pixel
	# Trả về mảng lưu tần suất (0 đến 1) mỗi pixel trong mảng
	pixel_probability = hist / hist.sum()
	# Calculating the CDF (Cumulative Distribution Function)
	# Hàm tích lũy
	cdf = np.cumsum(pixel_probability)

	# Nhân 255 để có được giá trị của pixel
	cdf_normalized = cdf * 255

	# Trả lại mảng tích lũy
	hist_eq = {}
	for i in range(len(cdf)):
		hist_eq[bins[i]] = int(cdf_normalized[i])

	return hist_eq

# Trả về hist đã được cắt và phân phối lại
def clip_histogram(hist, bins, clip_limit):
	'''Clips the given histogram.

	Parameters:
		hist: frequencies of each pixel.
		bins: pixels.
		clip_limit: limit to pixel frequencies.

	Returns the clipped hist.
	'''

	n_bins = len(bins)

	# Removing values above clip_limit
	# excess là số pixel vượt quá và bị cắt bỏ.
	excess = 0
	for i in range(n_bins):
		if hist[i] > clip_limit:
			excess += hist[i] - clip_limit
			hist[i] = clip_limit

	# Phân phối lại số pixel bị cắt bỏ
	## Redistributing exceding values ##
	# Calculating the values to be put on all bins
	for_each_bin = excess // n_bins
	# Calculating the values left
	leftover = excess % n_bins

	hist += for_each_bin
	for i in range(leftover):
		hist[i] += 1

	return hist

# Trả lại mảng tích lũy thu được từ hist sau khi cắt và phân phối lại.
def clipped_histogram_equalization(region):
    global clip_limit, n_iter
    '''Calculates the clipped histogram equalization for the given region.

    Parameters:
        region: array-like.

    Returns a dictionary with the CDF for each pixel in the region.
    '''

    # Building the histogram
    # excess là số pixel vượt quá và bị cắt bỏ.
    hist, bins = histogram(region)

    # hist = clip_histogram(hist=hist, bins=bins, clip_limit=self.clip_limit)
    
    # Clipping the histogram
    clipped_hist = clip_histogram(hist=hist, bins=bins, clip_limit=clip_limit)
    # Trying to reduce the values above clipping
    for _ in range(n_iter):
        clipped_hist = clip_histogram(hist, bins, clip_limit)
        
    cdf = calculate_cdf(hist=clipped_hist, bins=bins)

    return cdf

def clahe(image):
    global window_size
    '''Applies the CLAHE algorithm in an image.

    Parameters:
        image: image to be processed.

    Returns a processed image.
    '''

    border = window_size // 2

    padded_image = np.pad(image, border, "reflect")
    shape = padded_image.shape
    padded_equalized_image = np.zeros(shape).astype(np.uint8)

    for i in range(border, shape[0] - border):
        if i % 50 == 0:
            print(f"Line: {i}")
        for j in range(border, shape[1] - border):
            # Region to extract the histogram
            region = padded_image[i-border:i+border+1, j-border:j+border+1]
            cdf = clipped_histogram_equalization(region)
            # Changing the value of the image to the result from the CDF for the given pixel
            padded_equalized_image[i][j] = cdf[padded_image[i][j]]

    # Removing the padding from the image
    equalized_image = padded_equalized_image[border:shape[0] - border, border:shape[1] - border].astype(np.uint8)

    return equalized_image

def run(images):
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

        equalized_image = clahe(normalized_image)
        processed_images.append(equalized_image)

    return processed_images

