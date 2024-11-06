import React from 'react';

const Wishlist = () => {
  const list = localStorage.getItem('wishlist');
  return (
    <div>
      { list }
    </div>
  );
}

export default Wishlist;