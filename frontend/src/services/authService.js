import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:3001/auth'; // Update this URL to match your server

const signup = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, credentials);
        return response;
    } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default {
    signup,
    login,
};
