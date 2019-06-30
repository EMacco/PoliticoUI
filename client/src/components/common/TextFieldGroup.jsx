import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ id, placeholder, value, className, type, name, onChange, icon }) => {
  return (
    <div className="input-with-icon">
      <img src={icon} />
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        id={id}
        required
      />
    </div>
  );
};

TextFieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text',
  className: 'signin-text-field'
};

export default TextFieldGroup;
