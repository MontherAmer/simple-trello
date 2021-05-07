import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { showModal } from '../../../store/actions';

import checklistIcon from '../../../assets/checklist.svg';
import commentsIcon from '../../../assets/comments.svg';
import attachmentsIcon from '../../../assets/attachments.svg';

const Card = ({ card, listId, index }) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(showModal({ data: { ...card, listId }, type: 'UpdateCard' }));

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          onClick={card._id ? handleClick : null}
        >
          {card.label ? <div className="card-thumbnail-label" style={{ background: card.label }}></div> : null}
          <p className="card-paragragh">{card.title} </p>
          {card.attachments?.length ? <img src={card.attachments[0]} alt="image" style={{ width: '100%' }} /> : null}

          <div className="d-flex">
            {card.checkList?.length ? (
              <div className="card-thumbnail-icons">
                <img src={checklistIcon} /> {card.checkList.filter((c) => c.checked).length}/{card.checkList.length}
              </div>
            ) : null}

            {card.comments?.length ? (
              <div className="card-thumbnail-icons">
                <img src={commentsIcon} /> {card.comments.length}
              </div>
            ) : null}

            {card.attachments?.length ? (
              <div className="card-thumbnail-icons">
                <img src={attachmentsIcon} /> {card.attachments.length}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
