import io
from tkinter import Image
from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from PIL import Image
import io
from src.algorithms.runner import AlgorithmRunner
import base64
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"


def convert_to_black_and_white(image):
    
    return image.convert('L')

@app.route('/convert', methods=['POST'])
def convert_images():
    if 'images' not in request.files:
        return jsonify({'error': 'No images provided'}), 400
    
    images = request.files.getlist('images')
    processed_images = []

    for img_file in images:
        try:
            img = Image.open(io.BytesIO(img_file.read()))
            processed_img = convert_to_black_and_white(img)
            processed_images.append(processed_img)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    base64_images = []
    for image in processed_images:
        buffered = io.BytesIO()
        image.save(buffered, format='JPEG')
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        base64_images.append(img_str)

    return jsonify({'data': base64_images}), 200
    
if __name__ == '__main__':
    app.run(debug=True)
