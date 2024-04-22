python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt

# Chạy thử thuật toán UM với ảnh 001.jpg:
python app.py -i 001.jpg -a um -o res_um
# Kết quả chạy được sẽ nằm trong thư mục res_um dưới tên: hh_mm_ss_001.jpg

# Chạy thử thuật toán CLAHE duyệt qua toàn bộ ảnh trong thư mục data:
python app.py -p data -a clahe -o res_clahe
WS:128, CL:100, IT:1
# Kết quả chính chạy được sẽ nằm trong thư mục res_clahe dưới tên: hh_mm_ss_001.jpg