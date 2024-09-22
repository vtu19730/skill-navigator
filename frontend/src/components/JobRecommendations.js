import React from 'react';
import { Button, Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './YourCustomComponents'; // Import custom components

// JobRecommendations component
const JobRecommendations = () => {
  const jobs = ["Software Developer", "Data Analyst", "UX Designer"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Role Recommendations</CardTitle>
        <CardDescription>Explore job roles that match your skills and interests.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job, index) => (
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
              <button variant="outline">Learn More</button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;
