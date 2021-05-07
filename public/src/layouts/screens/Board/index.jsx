import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getOneBoard, showLoader, hideLoader, updateListOrder, updateCardLocation } from '../../../store/actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Nav from '../../components/NavBar';
import NewList from '../../components/NewCardList';
import BoardMenu from '../../components/Board_Menu';
import List from '../../components/List';

const Board = () => {
  const history = useHistory();
  const [state, setState] = useState({ showMenu: false });
  const boardState = useSelector((state) => state.boardState);
  const dispatch = useDispatch();
  const loadContent = async () => {
    // * if there is error(return false) in response return to home page
    dispatch(showLoader());
    let e = await dispatch(getOneBoard(history.location.pathname.split('/')[2]));
    dispatch(hideLoader());
    if (!e) history.push('/');
  };

  useEffect(() => {
    if (history?.location?.pathname?.split('/')[2] !== boardState._id) {
      (async () => {
        await loadContent();
      })();
    }
  }, [boardState]);

  const toggleMenu = () => setState({ ...state, showMenu: !state.showMenu });

  const handleDragEnd = (e) => {
    if (e.type === 'LIST') {
      let sourceIndex = e.source.index;
      let destinationIndex = e.destination.index;
      let source = boardState.lists[sourceIndex]._id;
      let destination = boardState.lists[destinationIndex]._id;
      dispatch(
        updateListOrder({ boardId: boardState._id, source: { source, sourceIndex }, destination: { destination, destinationIndex } })
      );
    } else {
      let data = {
        cardSourceIndex: e.source.index,
        cardDestIndex: e.destination.index,
        listSourceId: e.source.droppableId,
        listDestId: e.destination.droppableId,
        cardId: e.draggableId,
        boardId: boardState._id,
      };
      dispatch(updateCardLocation(data));
    }
  };

  return (
    <div className="h-100">
      <Nav />
      <div className="board" style={{ backgroundColor: `${boardState.background}` }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" type="LIST" direction="horizontal">
            {(provided, snapshot) => (
              <div
                style={{ display: 'flex' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDragging={snapshot.isDraggingOver}
              >
                {boardState?.lists?.map((item, i) => (
                  <List boardId={boardState._id} list={item} key={item._id} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="list-wrapper">
          <NewList id="newList" boardId={boardState._id} type="list" />
        </div>
        <h3 className="board-menu__button" onClick={toggleMenu}>
          show menu
        </h3>
        <BoardMenu show={state.showMenu} hide={toggleMenu} board={boardState} />
      </div>
    </div>
  );
};

export default Board;
