// import React from 'react';
import PropTypes from 'prop-types';
//
export default function Category({ name, slug }) {
  return (
    <li>
      <span>{name}</span>
    </li>
  );
}

Category.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
};
