import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ name, path }) => {
  return (
    <Fragment>
      <li>
        <Link to={path}>{name}</Link>
      </li>
    </Fragment>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default NavItem;
