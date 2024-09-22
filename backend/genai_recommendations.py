from flask import Blueprint, request, jsonify
import openai
from models import User
from utils import get_skills

recommend_blueprint = Blueprint('recommend', __name__)

openai.api_key = "your_openai_api_key"

@recommend_blueprint.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    skills = get_skills(data['skills'])
    
    prompt = f"Based on the skills {skills}, recommend suitable job roles."
    response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=100)
    
    return jsonify({'recommendations': response.choices[0].text.strip()}), 200
