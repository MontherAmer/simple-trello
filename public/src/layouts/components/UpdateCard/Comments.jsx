import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment, removeComment } from '../../../store/actions';

import commentsIcon from '../../../assets/comments.svg';
import trashIcon from '../../../assets/trash.svg';

export default ({ data, boardId, cardId }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ comments: [] });
  const { name } = useSelector((state) => state.userState);

  useEffect(() => {
    setState({ ...state, comments: data });
  }, [data]);

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const addComment = () => {
    if (state.text?.length) {
      dispatch(createComment({ text: state.text, boardId, cardId }));
      setState({ ...state, text: '', comments: state.comments.concat({ text: state.text }) });
    }
  };

  const handleRemoveComment = (index) => {
    let items = state.comments.filter((item, i) => i !== index);
    setState({ ...state, comments: items });
    dispatch(removeComment({ commentId: state.comments[index]._id, boardId, cardId }));
  };

  return (
    <div>
      <div className="card-update-header">
        <img src={commentsIcon} alt="checklist" />
        <h3>Comments</h3>
      </div>
      <div className="card-update-details">
        <input
          type="text"
          className="comment-input"
          value={state.text || ''}
          placeholder="Enter comment"
          name="text"
          onChange={handleChange}
        />
        <button className="btn btn-success btn-sm mt-1 mb-2" onClick={addComment}>
          Save
        </button>

        {state.comments.map((comment, i) => (
          <div className="comment" key={i}>
            <h4>{comment.user?.name || name}</h4>
            <p>{comment.text}</p>
            <img src={trashIcon} alt="delete" className="comment-delete" onClick={() => handleRemoveComment(i)} />
          </div>
        ))}
      </div>
    </div>
  );
};
