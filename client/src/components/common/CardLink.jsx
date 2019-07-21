import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardLink = ({ officeId, officeName, numberOfCandidates }) => {
  const link = `/offices?officeId=${officeId}&officeName=${officeName}`;
  return (
    <Fragment>
      Candidates: <Link to={link}>{numberOfCandidates} Candidates</Link>
    </Fragment>
  );
};

CardLink.propTypes = {
  officeId: PropTypes.number.isRequired,
  officeName: PropTypes.string.isRequired,
  numberOfCandidates: PropTypes.number.isRequired
};

export default CardLink;
