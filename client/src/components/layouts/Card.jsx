import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardText from '../common/CardText';
import CardLink from '../common/CardLink';

const Card = ({ name, image, content, hidden }) => {
  const cardContent = content.map(details => {
    const {
      type,
      title,
      value,
      officeId,
      officeName,
      numberOfCandidates,
      hidden,
      text,
      style
    } = details;
    let design;

    if (hidden === 'true') return;
    switch (type) {
      case 'link':
        design = (
          <CardLink
            officeId={officeId}
            officeName={officeName}
            numberOfCandidates={numberOfCandidates}
            key={Math.random().toString()}
          />
        );
        break;
      case 'button':
        design = (
          <button className={style} key={Math.random().toString()}>
            {text}
          </button>
        );
        break;
      case 'span':
        design = (
          <span className={style} key={Math.random().toString()}>
            {text}
          </span>
        );
        break;
      default:
        design = <CardText title={title} value={value} key={Math.random().toString()} />;
    }

    return design;
  });

  return (
    <Fragment>
      <div
        className={
          hidden === 'true'
            ? 'individual-person-container hidden-div'
            : 'individual-person-container'
        }
      >
        <div>
          <img src={image} />
        </div>
        <div className="profile-description-text">
          <label>
            <span className="profile-answers">{name.charAt(0).toUpperCase() + name.substr(1)}</span>
          </label>

          {cardContent}
        </div>
      </div>
    </Fragment>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.array,
  hidden: PropTypes.string
};

Card.defaultProps = {
  name: '',
  image: '',
  content: [],
  hidden: 'false'
};

export default Card;
