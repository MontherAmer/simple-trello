import React from 'react';
import descIcon from '../../../assets/description.svg';

export default ({ handleChange, update, showDescription, toggleDescription, description }) => {
  const calcHeight = (value) => {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // * newHeight = (lines x line-height) + some padding
    let newHeight = numberOfLineBreaks * 20 + 20;
    return newHeight;
  };

  return (
    <div>
      <div className="card-update-header">
        <img src={descIcon} alt="section" />
        <h3>Description</h3>
      </div>
      <div className="card-update-details">
        {showDescription ? (
          <textarea
            className="card-update-description"
            name="description"
            value={description || ''}
            onChange={handleChange}
            style={{ height: `${calcHeight(description || '')}px` }}
            onBlur={() => update('description')}
            placeholder="Add a more detailed description…"
          />
        ) : (
          <div className="description-placeholder" onClick={toggleDescription}>
            {description || 'Add a more detailed description…'}
          </div>
        )}
      </div>

      <div className="card-update-placeholder"></div>
    </div>
  );
};
