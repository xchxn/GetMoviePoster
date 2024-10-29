// src/components/Card.tsx
import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  image: string;
  title: string;
  description: string;
  onActionClick?: () => void;
  actionLabel?: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, onActionClick, actionLabel }) => {
  return (
    <div className={styles.cardContainer}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        {onActionClick && actionLabel && (
          <button className={styles.cardActionButton} onClick={onActionClick}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
