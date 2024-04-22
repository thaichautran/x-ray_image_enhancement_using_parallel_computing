import os
import imageio
from datetime import datetime
import src.arguments as ah
from src.algorithms.um import UM
from src.algorithms.clahe import CLAHE

class AlgorithmRunner:
	def __init__(self):
		# Khởi tạo một đối tượng để xử lý các đối số dòng lệnh
		self.arg_handler	= ah.ArgumentHandler()
		# Lấy thuật toán từ các đối số dòng lệnh
		self.algorithm		= self.arg_handler.get_algorithm()
		# Lấy đường dẫn của ảnh từ các đối số dòng lệnh
		self.image			= self.arg_handler.get_image()
		# Lấy đường dẫn thư mục chứa các ảnh từ các đối số dòng lệnh
		self.images_path	= self.arg_handler.get_path()
		# Xác định thư mục để lưu trữ kết quả
		output_path = self.arg_handler.get_output_path()
		if output_path:
			self.results_path = output_path
		else:
			self.results_path	= os.path.join("results", str(datetime.now()))

		os.makedirs(self.results_path, exist_ok=True)

	def __del__(self):
		self.algorithm		= ''
		self.image			= ''
		self.images_path	= ''
		self.results_path	= ''

	def run(self):
		'''Runs the algorithm in the images.'''

		if self.images_path:
			images = os.listdir(self.images_path)
			path = self.images_path
		else:
			# Đưa tên ảnh vào một danh sách để có thể sử dụng vòng lặp
			images = [self.image]
			path = ""

		for image in images:
			split_image = image.split('/')
			if len(split_image) != 1:
				self.image = split_image[-1]
			else:
				self.image = image

			processed_image = self.__run_algorithm(image, path)
			t = datetime.now()
			name = self.image.split(".")[0]
			filename = f"{t.hour}_{t.minute}_{t.second}_{name}.jpg"
			imageio.imwrite(os.path.join(self.results_path, filename), processed_image)

	def __run_algorithm(self, image, path):
		'''Runs the algorithm in the image.

		Parameters:
			image: image filename.
			path: image directory.

		Returns the processed image.
		'''

		img = os.path.join(path, image)
		alg = None

		# UM (Unsharping Mask)
		if self.algorithm == 'um':
			alg = UM(img)
		# CLAHE
		if self.algorithm == 'clahe':
			alg = CLAHE(img, self.results_path)

		try:
			image = alg.run()
		except Exception as e:
			print(e)
		else:
			return image