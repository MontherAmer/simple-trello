import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { hideModal, updateCard, deleteCard } from '../../../store/actions';
import { labels } from '../../../utils';

import closeIcon from '../../../assets/close.svg';
import checklistIcon from '../../../assets/checklist.svg';
import attachmentsIcon from '../../../assets/attachments.svg';
import trashIcon from '../../../assets/trash.svg';
import trellianIcon from '../../../assets/trellian.svg';
import labelIcon from '../../../assets/label.svg';

import Checklist from './CheckList';
import Loader from '../Loader';
import Comment from './Comments';
import Title from './Title';
import Members from './Members';
import Description from './Description';

export default () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ attachments: [] });
  const { modalData } = useSelector((state) => state.utilsState);
  const { _id } = useSelector((state) => state.boardState);

  useEffect(() => {
    setState({ ...state, ...modalData, loading: false, uploading: false });
  }, [modalData]);

  const close = () => dispatch(hideModal());

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const toggleDescription = () => setState({ ...state, showDescription: !state.showDescription });

  const update = async (e) => {
    setState({ ...state, showDescription: false, loading: e === 'member' ? true : false });
    dispatch(updateCard({ boardId: _id, cardId: state._id, name: [e], value: state[e] }));
  };

  const handleAttachment = (e) => {
    setState({ ...state, uploading: true });
    dispatch(updateCard({ boardId: _id, cardId: state._id, name: 'attachments', value: e.target.files[0] }));
  };

  const removeImage = (index) => {
    setState({ ...state, attachments: state.attachments.filter((item, i) => i !== index) });
    dispatch(updateCard({ boardId: _id, cardId: state._id, name: 'attachmentsR', value: index }));
  };

  const handleLabel = (l) => {
    setState({ ...state, label: l });
    dispatch(updateCard({ boardId: _id, cardId: state._id, name: 'label', value: l }));
  };

  const remove = () => {
    dispatch(deleteCard({ boardId: _id, listId: state.listId, cardId: state._id }));
    dispatch(hideModal());
  };

  return (
    <div className="card-update">
      <div className="card-update-container">
        <div className="left-side-update">
          {/* Card Title */}
          <Title title={state.title} handleChange={handleChange} update={update} />
          <div className="card-update-placeholder"></div>
          {/* Card Members */}
          <Members data={state.members} update={update} handleChange={handleChange} label={state.label} />
          <div className="card-update-placeholder"></div>
          {/* Card description */}
          <Description
            handleChange={handleChange}
            update={update}
            showDescription={state.showDescription}
            toggleDescription={toggleDescription}
            description={state.description}
          />
          {/* Card Checklist */}
          {state?.checkList?.length || state.showCheklist ? (
            <div className="card-update-header">
              <img src={checklistIcon} alt="checklist" />
              <h3>Checklist</h3>
            </div>
          ) : null}
          {state?.checkList?.length || state.showCheklist ? (
            <div className="card-update-details">
              <Checklist data={state.checkList} boardId={_id} cardId={state._id} />
            </div>
          ) : null}

          <div className="card-update-placeholder"></div>
          {/* Card Attachments */}
          {state?.attachments?.length ? (
            <div className="card-update-header">
              <img src={attachmentsIcon} alt="checklist" />
              <h3>Attachments</h3>
            </div>
          ) : null}
          {state?.attachments?.length ? (
            <div className="card-update-details">
              <div className="image-container">
                {state.attachments.map((item, i) => (
                  <div className="img-thumbnail position-relative">
                    <img src={item} alt="img" onClick={() => setState({ ...state, bigImg: item })} />
                    <img src={closeIcon} alt="close" className="img-preview-remove" onClick={() => removeImage(i)} />
                  </div>
                ))}
                {state.uploading ? (
                  <div className="img-thumbnail position-relative">
                    <Loader />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Comments */}
          <Comment data={state.comments || []} boardId={_id} cardId={state._id} />
        </div>

        {/* Actions */}
        <div className="right-side-update">
          <h5>ADD TO CARD</h5>
          <div class="dropdown">
            <div className="action-button" id="dropdownMenuButton" data-toggle="dropdown">
              <img src={trellianIcon} alt="member" />
              &nbsp;&nbsp;<p>Member</p>
            </div>
            <div className="dropdown-menu action-dropdown" aria-labelledby="dropdownMenuButton">
              <input type="text" name="member" onChange={handleChange} placeholder="Enter email" />
              <button className="btn btn-success btn-sm btn-block mt-1" onClick={() => update('member')}>
                Send
              </button>
            </div>
          </div>

          <div className="action-button" onClick={() => setState({ ...state, showCheklist: true })}>
            <img src={checklistIcon} alt="checklist" />
            &nbsp;&nbsp;<p>Checklist</p>
          </div>

          <div class="dropdown">
            <div className="action-button" id="dropdownMenuButton" data-toggle="dropdown">
              <img src={labelIcon} alt="member" />
              &nbsp;&nbsp;<p>Label</p>
            </div>
            <div className="dropdown-menu action-dropdown" aria-labelledby="dropdownMenuButton">
              <div className="labels-container">
                {labels.map((l) => (
                  <div
                    className={`label-container ${l === state.label ? 'selected' : ''}`}
                    style={{ backgroundColor: l }}
                    onClick={() => handleLabel(l)}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <input type="file" id="upload" hidden onChange={handleAttachment} />
          <label htmlFor="upload" style={{ width: '100%' }}>
            <div className="action-button">
              <img src={attachmentsIcon} alt="checklist" />
              &nbsp;&nbsp;<p>Attachment</p>
            </div>
          </label>

          <br />
          <br />
          <h5>Actions</h5>

          <div className="action-button" onClick={remove}>
            <img src={trashIcon} alt="checklist" />
            &nbsp;&nbsp;<p>Delete Card</p>
          </div>
        </div>
      </div>

      {/* Close button */}
      <img className="card-update__close" src={closeIcon} alt="close" onClick={close} />
      {state.bigImg ? (
        <div className="image-full" onClick={() => setState({ ...state, bigImg: null })}>
          <img src={state.bigImg} className="img-thumbnail" />
        </div>
      ) : null}
    </div>
  );
};
