import React, { createContext, useState } from 'react';
export const ShowCreateContext = createContext();

export default (props) => {
  const [state, setState] = useState({ showId: '' });

  const updateShowCreate = (e) => setState({ ...state, showId: e.target.id || '' });

  return (
    <ShowCreateContext.Provider value={{ ...state, updateShowCreate: updateShowCreate }}>{props.children}</ShowCreateContext.Provider>
  );
};
