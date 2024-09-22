import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SkillPaths from './components/SkillPaths';
import Profile from './components/Profile';
import RecommendationForm from './components/RecommendationForm';

const App = () => {
    return (
        <Router>
            <Switch>
            <Route path="/gen" component={RecommendationForm} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile" component={Profile} />
                <Route path="/skill-paths" component={SkillPaths} />
            </Switch>
        </Router>
    );
};

export default App;
