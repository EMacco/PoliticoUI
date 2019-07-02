import React from 'react';
import PropTypes from 'prop-types';

const CardText = ({ title, value }) => {
  return (
    <label>
      {title}: <span className="profile-answers">{value}</span>
    </label>
  );
};

CardText.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default CardText;
