import React, { useState } from 'react';
import axios from 'axios';

// Custom Button Component
const Button = ({ onClick, children, variant, size, ...props }) => {
  const baseStyles = "px-4 py-2 font-semibold rounded";
  const variantStyles = variant === "secondary" ? "bg-gray-500 text-white" : "bg-blue-500 text-white";
  const sizeStyles = size === "sm" ? "text-sm" : "text-base";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Input Component
const Input = ({ id, placeholder, ...props }) => (
  <input
    id={id}
    placeholder={placeholder}
    className="p-2 border border-gray-300 rounded w-full"
    {...props}
  />
);

// Custom Label Component
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

// Custom Card Components
const Card = ({ children, className }) => (
  <div className={`border border-gray-200 rounded shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="border-b border-gray-200 pb-2 mb-2">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="mb-2">
    {children}
  </div>
);

const CardFooter = ({ children }) => (
  <div className="pt-2">
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>
    {children}
  </h2>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">
    {children}
  </p>
);

// Custom Tabs Components
const Tabs = ({ value, onValueChange, children }) => (
  <div>
    {React.Children.map(children, child => {
      return React.cloneElement(child, { activeTab: value, onTabChange: onValueChange });
    })}
  </div>
);

const TabsList = ({ children, className }) => (
  <div className={`flex ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, activeTab, onTabChange, children }) => (
  <button
    className={`flex-1 p-2 text-center ${activeTab === value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    onClick={() => onTabChange(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, activeTab, children }) => (
  <div className={activeTab === value ? "block" : "hidden"}>
    {children}
  </div>
);

// JobRoleRecommendations Component
const JobRoleRecommendations = () => (
  <Card>
    <CardHeader>
      <CardTitle>Job Role Recommendations</CardTitle>
      <CardDescription>Explore job roles that match your skills and interests.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {["Software Developer", "Data Analyst", "UX Designer"].map((job, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{job}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Learn More</Button>
          </CardFooter>
        </Card>
      ))}
    </CardContent>
  </Card>
);

// SkillNavigator Component
const SkillNavigator = () => {
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

      // Assuming the response contains HTML content in recommendations
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to fetch recommendations. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Navigator</CardTitle>
        <CardDescription>Discover courses and learning paths for your desired job role.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <form onSubmit={handleSubmit}>
            <Label htmlFor="skills">Enter Skills (comma-separated):</Label>
            <Input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., JavaScript, Node.js, React"
            />
            <Button type="submit">Get Recommendations</Button>
          </form>
        </div>
        <Card>
          <h1>Recommended Job Roles:</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {recommendations && (
            <div
              dangerouslySetInnerHTML={{ __html: recommendations }}
              className="recommendations-content"
            />
          )}
        </Card>
      </CardContent>
    </Card>
  );
};


// Main CareerNavigator Component
const CareerNavigator = () => {
  const [activeTab, setActiveTab] = useState('job-roles');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Career Navigator</h1>
        <nav className="flex items-center space-x-4">
          <span className="font-medium">John Doe</span>
          <Button variant="secondary" size="sm">Profile</Button>
        </nav>
      </header>

      <main className="flex-grow p-6">
        <section className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="job-roles" activeTab={activeTab} onTabChange={setActiveTab}>
                Job Role Recommendations
              </TabsTrigger>
              <TabsTrigger value="skill-navigator" activeTab={activeTab} onTabChange={setActiveTab}>
                Skill Navigator
              </TabsTrigger>
            </TabsList>
            <TabsContent value="job-roles" activeTab={activeTab}>
              <JobRoleRecommendations />
            </TabsContent>
            <TabsContent value="skill-navigator" activeTab={activeTab}>
              <SkillNavigator />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <div className="fixed bottom-4 right-4">
        <Button size="icon" className="rounded-full w-12 h-12">
          <span className="sr-only">Open chatbot</span>
        </Button>
      </div>
    </div>
  );
};

export default CareerNavigator;
