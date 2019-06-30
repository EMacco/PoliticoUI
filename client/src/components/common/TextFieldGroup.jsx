import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  id,
  placeholder,
  value,
  className,
  type,
  name,
  onChange,
  icon,
  error
}) => {
  return (
    <Fragment>
      <div className="input-with-icon" style={{ position: 'relative' }}>
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
      {error && <div className="errorDiv">{error}</div>}
    </Fragment>
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
  icon: PropTypes.string,
  error: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text',
  className: 'signin-text-field'
};

export default TextFieldGroup;
