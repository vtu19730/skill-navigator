const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const OpenAI = require('openai');
const {GoogleGenerativeAI} = require('@google/generative-ai')
const { Schema } = mongoose;

const app = express();
app.use(express.json());
app.use(cors());
const genAi = new GoogleGenerativeAI('AIzaSyALjVQLWaFj5Ch7dERTvY-BncI_Vv71bJk')
SECRET_KEY = 'a79bc9de49320b183409c0164ae1f6175e52014f2d630099d3cbaca74ad0965a'

// Connect to MongoDB
mongoose.connect('mongodb+srv://mohan:mohan@cluster0.99ist.mongodb.net/skill_navigator?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
const UserSchema = new Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

const openai = new OpenAI({
    apiKey: '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'
});
app.get('/',(req,res)=>{
    res.status(200).send('Connexted')
})
// Signup Route
app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
});

// Login Route
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user_id: user._id }, 'a79bc9de49320b183409c0164ae1f6175e52014f2d630099d3cbaca74ad0965a', { expiresIn: '24h' });
    res.json({ token });
});

// Get Recommendations Route
app.post('/recommend/get_recommendations', async (req, res) => {
    try {
        const { skills } = req.body;

        if (!Array.isArray(skills)) {
            return res.status(400).json({ message: 'Skills must be an array' });
        }

        if (skills.length === 0) {
            return res.status(400).json({ message: 'Skills array cannot be empty' });
        }
        const prompt = `Based on the skills ${skills.join(', ')}, recommend suitable job roles. in html structure from body tag`;
        
        const model = await genAi.getGenerativeModel({
            model: 'gemini-1.5-pro', // Use 'model' instead of 'engine'
        });

        const response = await model.generateContent(prompt)
        console.log(response.response.text())
        res.json({ recommendations: response.response.text() });

    } catch (error) {
        console.error('Error in /recommend/get_recommendations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
