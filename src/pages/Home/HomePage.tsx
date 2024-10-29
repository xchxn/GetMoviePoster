// src/pages/Home/HomePage.tsx
import React from 'react';
import Card from '../../components/Card/Card';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <div>
        {/* Map over and render popular content */}
        {[1, 2, 3].map((item) => (
          <Card image="https://via.placeholder.com/150" key={item} title={`Content ${item}`} description="Popular content" />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
