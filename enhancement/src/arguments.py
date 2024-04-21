import argparse

class ArgumentHandler:
	'''Handles the program's arguments.'''

	def __init__(self):
		self.__parser = argparse.ArgumentParser()
		self.__define_arguments()
		self.__parsed_args = vars(self.__parser.parse_args())

	def __define_arguments(self):
		# tạo ra một nhóm các arguments mà chỉ một trong số chúng có thể được chọn (không thể cùng lúc chọn cả hai -i và -p)
		group = self.__parser.add_mutually_exclusive_group(required=True)
		group.add_argument("-i", metavar="img", type=str, help="image to be processed")
		group.add_argument("-p", metavar="path", type=str, help="path to the images to be processed")

		# Thêm một argument trực tiếp vào ArgumentParser (có thể chọn cả -a và -o)
		self.__parser.add_argument("-a", metavar="alg", type=str, help="algorithm to be used", required=True, choices=["clahe", "um", "hef"])
		self.__parser.add_argument("-o", metavar="path", type=str, help="path to export the results", required=False)

	'''
	kiểm tra self.__parsed_args['i'] là cần thiết vì đối số -i không bắt buộc phải có.
	Nếu người dùng không cung cấp -i khi chạy chương trình, thì self.__parsed_args['i']
	sẽ không tồn tại và truy cập trực tiếp vào nó có thể gây ra lỗi.
	Do đó, cần kiểm tra xem self.__parsed_args['i'] có tồn tại hay không trước khi trả về giá trị của nó
	'''
	def get_image(self):
		'''Gets the image from argument -i.'''

		if self.__parsed_args['i']:
			return self.__parsed_args['i']

	'''
	kiểm tra self.__parsed_args['p'] là cần thiết vì đối số -p không bắt buộc phải có.
	Nếu người dùng không cung cấp -p khi chạy chương trình, thì self.__parsed_args['p']
	sẽ không tồn tại và truy cập trực tiếp vào nó có thể gây ra lỗi.
	Do đó, cần kiểm tra xem self.__parsed_args['p'] có tồn tại hay không trước khi trả về giá trị của nó
	'''
	def get_path(self):
		'''Gets the path from argument -p.'''

		if self.__parsed_args['p']:
			return self.__parsed_args['p']

	def get_algorithm(self):
		'''Gets the algorithm from argument -a.'''

		return self.__parsed_args['a']

	"""
	Kiểm tra self.__parsed_args['o'] là cần thiết vì đối số -o không bắt buộc phải có.
	Nếu người dùng không cung cấp -o khi chạy chương trình, thì self.__parsed_args['o']
	sẽ không tồn tại và truy cập trực tiếp vào nó có thể gây ra lỗi.
	Do đó, cần kiểm tra xem self.__parsed_args['o'] có tồn tại hay không trước khi trả về giá trị của nó."""
	def get_output_path(self):
		'''Gets the path from argument -o.'''

		if self.__parsed_args['o']:
			return self.__parsed_args['o']