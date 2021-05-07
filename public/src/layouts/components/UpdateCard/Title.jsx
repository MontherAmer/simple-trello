import React from 'react';
import titleIcon from '../../../assets/card.svg';

export default ({ title, handleChange, update }) => {
  return (
    <div className="card-update-header">
      <img src={titleIcon} alt="header" />
      <input
        value={title}
        name="title"
        maxLength={30}
        onChange={handleChange}
        onBlur={() => update('title')}
        className="update-card-title"
      />
    </div>
  );
};
