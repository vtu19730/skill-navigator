import React, { useState } from 'react';
import axios from 'axios';

const RecommendationForm = () => {
    const [skills, setSkills] = useState('');
    const [recommendations, setRecommendations] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setRecommendations('');

        try {
            const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
            if (skillsArray.length === 0) {
                setError('Please enter at least one skill.');
                return;
            }

            const response = await axios.post('http://localhost:3001/recommend/get_recommendations', {
                skills: skillsArray
            });

            setRecommendations(response.data.recommendations);
        } catch (err) {
            console.error('Error fetching recommendations:', err);
            setError('Failed to fetch recommendations. Please try again.');
        }
    };

    return (
        <div>
            <h1>Skill Recommendation</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="skills">Enter Skills (comma-separated):</label>
                <input
                    id="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g., JavaScript, Node.js, React"
                />
                <button type="submit">Get Recommendations</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {recommendations && (
                <div>
                    <h2>Recommended Job Roles:</h2>
                    <p>{recommendations}</p>
                </div>
            )}
        </div>
    );
};

export default RecommendationForm;
