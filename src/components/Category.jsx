// import React from 'react';
import PropTypes from 'prop-types';
//
export default function Category({ name, slug, setCategoryInput, categoryInput }) {
  // console.log(slug, categoryInput === slug);
  return (
    <li>
      <span onClick={() => setCategoryInput(slug)} className={categoryInput === slug ? 'is-active' : 'tete'}>
        {name}
      </span>
    </li>
  );
}

Category.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
};
