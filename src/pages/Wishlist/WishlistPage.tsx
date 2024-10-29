// src/pages/Wishlist/WishlistPage.tsx
import React from 'react';
import Card from '../../components/Card/Card';

const WishlistPage: React.FC = () => {
  return (
    <div>
      <h1>Your Wishlist</h1>
      <div>
        {/* Render wishlist content */}
        {[1, 2, 3].map((item) => (
          <Card image="https://via.placeholder.com/150" key={item} title={`Wishlist Item ${item}`} description="Content you liked" />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
