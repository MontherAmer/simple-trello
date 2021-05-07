import React, { useState, useEffect } from 'react';

import plusIcon from '../../../assets/plus.svg';
import Loader from '../Loader';

export default ({ data, update, handleChange, label }) => {
  const [state, setState] = useState({ members: [] });

  useEffect(() => {
    setState({ ...state, members: data });
  }, [data]);

  return (
    <div className="card-update-members">
      <div>
        <h5>MEMBERS</h5>
        <div className="d-flex">
          {state?.members?.map((item, i) => (
            <div className="pointer rounded-img small mr-2 mb-1">
              {item.email[0].toUpperCase()}
              {item.email[1].toUpperCase()}
            </div>
          ))}
          {state.loading ? (
            <div className="pointer rounded-img small mr-2 mb-1 position-relative">
              <Loader />
            </div>
          ) : null}
          <div class="dropdown">
            <div className="pointer rounded-img small " id="dropdownMenuButton" data-toggle="dropdown">
              <img src={plusIcon} alt="add" />
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <input type="text" name="member" onChange={handleChange} placeholder="Enter email" />
              <button className="btn btn-success btn-sm btn-block mt-1" onClick={() => update('member')}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      {label ? (
        <div>
          <h5>LABEL</h5>
          <div className="label-container selected " style={{ backgroundColor: label }}></div>
        </div>
      ) : null}
    </div>
  );
};
