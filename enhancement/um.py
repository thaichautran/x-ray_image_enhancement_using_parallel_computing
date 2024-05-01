import numpy as np
from scipy.ndimage import gaussian_filter, median_filter, maximum_filter, minimum_filter
from skimage import img_as_float
import os
import cv2

def um(img, option):
    radius = 20
    amount = 5
    img = img_as_float(img) # ensuring float values for computations

    # Tạo blurred_image là ảnh đã làm mờ.
    if option == 1:
        blurred_image = gaussian_filter(img, sigma=radius)
        # G(x,y)= 1/(2πσ) * e ^ ​( (x*x + y*y) / -2 / σ / σ) với x = y = 0 là trung tâm ma trận. σ là độ lệch chuẩn có giá trị 0.2 mặc định
    elif option == 2:
        '''
        The median filter selects the median value within an ordered window of pixels values
        and replaces the central pixel with the median value'''
        blurred_image = median_filter(img, size=20)
        # Ma trận 7 có tâm là 49 và các giá trị khác là -1
    elif option == 3:
        '''
        The maximum filter selects the largest value within an ordered window of pixels values
        and replaces the central pixel with the largest value (lightest one)'''
        blurred_image = maximum_filter(img, size=20)
    else:
        '''
        The minimum filter selects the lowest value within an ordered window of pixels values
        and replaces the central pixel with the lowest value (lowest one)'''
        blurred_image = minimum_filter(img, size=20)

    # mask được tạo ra bằng cách lấy sự khác biệt giữa ảnh gốc (image) và ảnh đã được làm mờ (blurred_image).
    # Mặt nạ này thường chứa các cạnh và chi tiết trong ảnh gốc
    mask = img - blurred_image # keep the edges created by the filter
    # sharpened_image được tạo ra bằng cách kết hợp ảnh gốc và mặt nạ chứa các cạnh áp vào.
    sharpened_image = img + mask * amount

    sharpened_image = np.clip(sharpened_image, float(0), float(1)) # Interval [0.0, 1.0]
    sharpened_image = (sharpened_image*255).astype(np.uint8) # Interval [0,255]

    return sharpened_image

# Xử lý danh sách ảnh images và lưu kết quả vào res_um
def run(images, res_um):
    processed_images = []
    for idx, image in enumerate(images):
        # Tạo tên thư mục từ tên của ảnh
        image_name = f"image_{idx + 1}"
        folder_path = os.path.join(res_um, image_name)

        # Tạo thư mục nếu nó không tồn tại
        os.makedirs(folder_path, exist_ok=True)

        processed_images_tuple = []
        equalized_image1 = um(image, 1)
        equalized_image2 = um(image, 2)
        equalized_image3 = um(image, 3)
        equalized_image4 = um(image, 4)

        # Lưu các ảnh đã xử lý vào thư mục tương ứng
        cv2.imwrite(os.path.join(folder_path, "gaussian_equalized_image.jpg"), equalized_image1)
        cv2.imwrite(os.path.join(folder_path, "median_equalized_image.jpg"), equalized_image2)
        cv2.imwrite(os.path.join(folder_path, "maximum_equalized_image.jpg"), equalized_image3)
        cv2.imwrite(os.path.join(folder_path, "minimum_equalized_image.jpg"), equalized_image4)

        processed_images_tuple.extend([equalized_image1, equalized_image2, equalized_image3, equalized_image4])
        processed_images.append(processed_images_tuple)
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

images = read_images_from_fraction_directory("data\\fraction\\images")

run(images=images, res_um="res_um")

'''
Ref: https://uomustansiriyah.edu.iq/media/lectures/9/9_2020_05_12!05_09_40_PM.pdf
'''