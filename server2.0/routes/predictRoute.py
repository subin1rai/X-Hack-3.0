# predictRoute.py
import os
import numpy as np
import tensorflow as tf
from flask import Blueprint, request, jsonify, send_from_directory
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from io import BytesIO

# Create a blueprint
predict_blueprint = Blueprint('predict', __name__)

# Load model
model = tf.keras.models.load_model('./models/my_model.h5')

# Disable oneDNN optimizations
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Define your classes
classes = [
    'Apple__Apple_scab', 'Apple_Black_rot', 'Apple_Cedar_apple_rust', 'Apple__healthy',
    'Blueberry__healthy', 'Cherry(including_sour)Powdery_mildew', 'Cherry(including_sour)_healthy',
    'Corn_(maize)Cercospora_leaf_spot Gray_leaf_spot', 'Corn(maize)Common_rust', 'Corn_(maize)_Northern_Leaf_Blight',
    'Corn_(maize)healthy', 'Grape_Black_rot', 'Grape_Esca(Black_Measles)',
    'Grape__Leaf_blight(Isariopsis_Leaf_Spot)', 'Grape__healthy', 'Orange_Haunglongbing(Citrus_greening)',
    'Peach__Bacterial_spot', 'Peach_healthy', 'Pepper,_bell_Bacterial_spot', 'Pepper,_bell__healthy',
    'Potato__Early_blight', 'Potato_Late_blight', 'Potato_healthy', 'Raspberry__healthy',
    'Soybean__healthy', 'Squash_Powdery_mildew', 'Strawberry_Leaf_scorch', 'Strawberry__healthy',
    'Tomato__Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato__Leaf_Mold',
    'Tomato__Septoria_leaf_spot', 'Tomato_Spider_mites Two-spotted_spider_mite', 'Tomato__Target_Spot',
    'Tomato__Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_Tomato_mosaic_virus', 'Tomato__healthy'
]

# Ensure the directory exists for storing images
image_directory = "./images/"
if not os.path.exists(image_directory):
    os.makedirs(image_directory)

@predict_blueprint.route('/upload', methods=['POST'])
def upload_image():
    image_file = request.files['image']
    if image_file:
        image_path = os.path.join(image_directory, image_file.filename)
        image_file.save(image_path)
        return jsonify({'message': 'Image uploaded successfully', 'path': image_path})
    else:
        return jsonify({'error': 'No image provided'}), 400

@predict_blueprint.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    image_stream = BytesIO(image_file.read()) 

    image = load_img(image_stream, target_size=(224, 224))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)
    result_index = np.argmax(prediction, axis=1)[0]
    disease_name = classes[result_index]
    return jsonify({'prediction': disease_name})

@predict_blueprint.route('/images/<filename>')
def get_image(filename):
    return send_from_directory(image_directory, filename)