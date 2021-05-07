import React, { useState, useEffect } from 'react';

const Cyrcle = ({ data, size }) => {
  const [state, setState] = useState({ title: '' });

  useEffect(() => {
    setState({ ...state, title: data ? data[0]?.toUpperCase() : 'M' });
  }, [data]);

  return (
    <div className={`pointer rounded-img ${size === 'larg' ? 'larg' : 'small'}`}>
      <p> {state.title}</p>
    </div>
  );
};

export default Cyrcle;
