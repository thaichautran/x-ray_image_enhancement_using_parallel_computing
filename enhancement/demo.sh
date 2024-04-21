pip -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt

# Chạy thử thuật toán UM:
python app.py -i 001.jpg -a um -o 001
# Kết quả chạy được sẽ nằm trong thư mục 001 dưới tên: hh_mm_ss_001.jpg

# Chạy thử thuật toán CLAHE:
python app.py -i 001.jpg -a clahe -o 002
# Kết quả chính chạy được sẽ nằm trong thư mục 002 dưới tên: hh_mm_ss_001.jpg