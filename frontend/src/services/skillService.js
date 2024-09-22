import axios from 'axios';

const API_URL = 'http://localhost:5000/recommend';

const getRecommendations = (data) => {
    return axios.post(`${API_URL}/get_recommendations`, data);
};

export default {
    getRecommendations,
};
