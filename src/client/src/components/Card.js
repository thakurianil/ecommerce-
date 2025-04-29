import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', to, onClick }) => {
  const cardContent = (
    <div className={`card ${className}`}>
      {children}
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {cardContent}
      </div>
    );
  }

  return cardContent;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card; 