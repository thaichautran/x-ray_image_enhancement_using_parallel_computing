import src.utils as pu
import cv2 # type: ignore
import numpy as np
import imageio
import matplotlib.pyplot as plt
import os
import timeit

class CLAHE:
	'''Contrast Limited Adaptive Histogram Equalization.
	In reality, we do a normalization before applying CLAHE, making it the N-CLAHE method, but in
	N-CLAHE the normalization is done using a log function, instead of a linear one, as we use here.
	'''

	def __init__(self, filename, results_path, window_size=128, clip_limit=100, n_iter=1):
		self.filename = filename
		self.results_path = results_path
		self.window_size = window_size
		self.clip_limit = clip_limit
		self.n_iter = n_iter

	def run(self):
		image = imageio.imread(self.filename)

		if len(image.shape) > 2:
			image = pu.to_grayscale(image)
		# Resize ảnh đến kích thước 1024x1024
		resized_image = cv2.resize(image, (1024, 1024))

		normalized_image = pu.normalize(np.min(resized_image), np.max(resized_image), 0, 255, resized_image)
		imageio.imwrite(os.path.join(self.results_path, "normalized_image.jpg"), normalized_image)

		# start = timeit.default_timer()
		equalized_image = self.clahe(normalized_image)
		# stop = timeit.default_timer()

		# self.export_histogram(image, normalized_image, equalized_image)
		# self.export_run_info(stop - start)

		return equalized_image

	def clahe(self, image):
		'''Applies the CLAHE algorithm in an image.

		Parameters:
			image: image to be processed.

		Returns a processed image.
		'''

		border = self.window_size // 2

		padded_image = np.pad(image, border, "reflect")
		shape = padded_image.shape
		padded_equalized_image = np.zeros(shape).astype(np.uint8)

		for i in range(border, shape[0] - border):
			if i % 50 == 0:
				print(f"Line: {i}")
			for j in range(border, shape[1] - border):
				# Region to extract the histogram
				region = padded_image[i-border:i+border+1, j-border:j+border+1]
				cdf = self.clipped_histogram_equalization(region)
				# Changing the value of the image to the result from the CDF for the given pixel
				padded_equalized_image[i][j] = cdf[padded_image[i][j]]

		# Removing the padding from the image
		equalized_image = padded_equalized_image[border:shape[0] - border, border:shape[1] - border].astype(np.uint8)

		return equalized_image

    # Trả lại mảng tích lũy thu được từ hist sau khi cắt và phân phối lại.
	def clipped_histogram_equalization(self, region):
		'''Calculates the clipped histogram equalization for the given region.

		Parameters:
			region: array-like.

		Returns a dictionary with the CDF for each pixel in the region.
		'''

		# Building the histogram
		# excess là số pixel vượt quá và bị cắt bỏ.
		hist, bins = pu.histogram(region)

		hist = pu.clip_histogram(hist=hist, bins=bins, clip_limit=self.clip_limit)
		
        # Clipping the histogram
		clipped_hist = pu.clip_histogram(hist=hist, bins=bins, clip_limit=self.clip_limit)
        # Trying to reduce the values above clipping
		for _ in range(self.n_iter):
			clipped_hist = pu.clip_histogram(hist, bins, self.clip_limit)
			
		cdf = pu.calculate_cdf(hist=clipped_hist, bins=bins)

		return cdf

    # # Vẽ histogram
	# def export_histogram(self, image, normalized, equalized):
	# 	''' Vẽ và lưu đồ histogram của ba loại ảnh khác nhau:
    #         Ảnh gốc
    #         Ảnh đã được chuẩn hóa
    #         Ảnh đã được xử lý bằng thuật toán CLAHE
    #     '''
	# 	plt.xlabel("Pixel")
	# 	plt.ylabel("Count")

	# 	hist, bins = pu.histogram(image)
	# 	plt.plot(bins, hist, label='Original Image')
	# 	plt.legend()

	# 	hist, bins = pu.histogram(normalized)
	# 	plt.plot(bins, hist, label='Normalized Image')
	# 	plt.legend()

	# 	hist, bins = pu.histogram(equalized)
	# 	plt.plot(bins, hist, label='CLAHE Result')
	# 	plt.legend()
	# 	plt.savefig(os.path.join(self.results_path, "histograms.jpg"))

    # Để ghi thông tin về quá trình chạy của thuật toán vào một tệp văn bản có tên là "runinfo.txt"
	# def export_run_info(self, runtime):
	# 	with open(os.path.join(self.results_path, "runinfo.txt"), 'w+') as f:
	# 		f.write(f"Runtime: {runtime:.2f}s\n")
	# 		f.write(f"Window size: {self.window_size}\n")
	# 		f.write(f"Clip limit: {self.clip_limit}\n")