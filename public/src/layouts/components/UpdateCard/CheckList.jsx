import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateCard } from '../../../store/actions';

import closeIcon from '../../../assets/close.svg';
import trashIcon from '../../../assets/trash.svg';

export default ({ boardId, cardId, data }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ items: [] });
  useEffect(() => {
    let progress = data.filter((item) => item.checked).length;
    setState({ ...state, progress, items: data });
  }, []);

  const toggleShowingInput = () => setState({ ...state, item: '', showInput: !state.showInput });

  const handleInputChange = (e) => setState({ ...state, item: e.target.value });

  const handleAddItem = () => {
    setState({ ...state, item: '', items: state.items.concat({ title: state.item, checked: false }) });
    submit({ ...state, items: state.items.concat({ title: state.item, checked: false }) });
  };

  const handleCheckItem = (i) => {
    let items = state.items;
    items[i].checked = !items[i].checked;
    let progress = items.filter((item) => item.checked).length;
    setState({ ...state, items, progress });
    submit({ ...state, items, progress });
  };

  const handleRemoveItem = (index) => {
    setState({ ...state, items: state.items.filter((item, i) => i !== index) });
    submit({ ...state, items: state.items.filter((item, i) => i !== index) });
  };

  const submit = (data) => dispatch(updateCard({ boardId: boardId, cardId: cardId, name: 'checkList', value: data.items }));

  return (
    <div>
      {state?.items?.length ? (
        <input
          type="range"
          // className="form-control-range mb-2"
          min={0}
          max={state?.items?.length}
          value={state?.progress || 0}
        />
      ) : null}
      <div>
        {state.items?.map((item, i) => (
          <div className="check-item" key={i}>
            <div className={`check-label ${item.checked ? 'checked' : ''}`} onClick={() => handleCheckItem(i)}></div>
            <div className="check-text">{item.title}</div>
            <img src={trashIcon} onClick={() => handleRemoveItem(i)} className="pointer" />
          </div>
        ))}
      </div>
      {state.showInput ? (
        <div>
          <input type="text" value={state.item} className="checklist-input" onChange={handleInputChange} />
          <div className="d-flex align-items-center">
            <button className="btn btn-success btn-sm" onClick={handleAddItem}>
              Add
            </button>
            <img className="checklist-close" src={closeIcon} alt="close" onClick={toggleShowingInput} />
          </div>
        </div>
      ) : (
        <div style={{ width: '117px' }} onClick={toggleShowingInput}>
          <div className="action-button">Add an item</div>
        </div>
      )}
    </div>
  );
};
