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
  value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
};

export default CardText;
