import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { updateList, showModal } from '../../../store/actions';
import removeIcon from '../../../assets/remove.svg';

import Card from '../Card';
import NewCard from '../NewCardList';

const List = ({ boardId, list, index }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  useEffect(() => {
    setState({ ...state, ...list });
  }, [list]);

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const updateTitle = () =>
    list.title !== state.title ? dispatch(updateList({ boardId, listId: list._id, title: state.title })) : {};

  const handleDelete = () => dispatch(showModal({ data: { boardId, listId: list._id }, type: 'RemoveList' }));

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div className="list-wrapper" isDragging={snapshot.isDragging} {...provided.draggableProps} ref={provided.innerRef}>
          <div className={snapshot.isDragging ? 'list-content-dragging' : 'list-content'} {...provided.dragHandleProps}>
            <div className="list-header">
              <input
                className="list-title"
                type="text"
                value={state.title || ''}
                name="title"
                onChange={handleChange}
                onBlur={updateTitle}
              />
              <img src={removeIcon} className="remove-list-icon" onClick={handleDelete} />
            </div>
            <Droppable droppableId={list._id} type="CARD">
              {(provided) => (
                <div className="list-body" ref={provided.innerRef} {...provided.droppableProps}>
                  {list?.cards?.map((item, i) => (
                    <Card key={item._id} card={item} index={i} listId={list._id} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="list-footer">
              <NewCard id={list._id} boardId={boardId} type="card" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
