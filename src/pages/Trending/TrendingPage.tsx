// src/pages/Trending/TrendingPage.tsx
import React from 'react';
import Card from '../../components/Card/Card';

const TrendingPage: React.FC = () => {
  return (
    <div>
      <h1>Trending Now</h1>
      <div>
        {/* Render trending content */}
        {[1, 2, 3].map((item) => (
          <Card  image="https://via.placeholder.com/150" key={item} title={`Trending Content ${item}`} description="This is trending!" />
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
