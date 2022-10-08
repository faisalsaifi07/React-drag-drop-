import { useEffect, useState } from 'react';
import './App.css';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

const data = [
  {
    id : 'item-1',
    content : 'Hello There 1'
  },
  {
    id : 'item-2',
    content : 'Hello There 2'
  },
  {
    id : 'item-3',
    content : 'Hello There 3'
  },
  {
    id : 'item-4',
    content : 'Hello There 4'
  },
  {
    id : 'item-5',
    content : 'Hello There 5'
  },
  {
    id : 'item-6',
    content : 'Hello There 6'
  },
]

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const grid = 8;

const getItemStyle = (isDragging,draggableStyle ) => ({
  userSelect : 'none',
  padding : grid*2,
  margin : '0 0 8px 0',
  background: isDragging? 'lightgreen' : 'grey',
  ...draggableStyle
});

const getLisStyle = (isDraggingOver)=>({
  background : isDraggingOver? 'lightblue': 'lightgrey',
  padding : grid,
  width : 250
});

function App() {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    setItems(data)
  }, []);

  const onDragEnd = (result) =>{
    if(!result.destination){
      return;
    }
    const reorderedItem = reorder(items, 
      result.source.index, 
      result.destination.index 
    );

    console.log(reorderedItem);
    setItems(reorderedItem)
  }
  return (
    <div className='main-content'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) =>(
            <div {...provided.droppableProps} 
            ref ={provided.innerRef} 
            style ={getLisStyle(snapshot.isDraggingOver)}>
              {
                items.map((item, index) => {
                  return <Draggable key = {item.id}
                   draggableId = {item.id} 
                   index = {index}>

                     {(provided, snapshot) =>(
                      <div className='card'
                      ref = {provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style = {getItemStyle(
                        snapshot.isDragging, 
                        provided.draggableProps.style
                        )}>
                          {item.content}
                      </div>
                     )}
                  </Draggable>
                })
              }
              {provided.p}
            </div>
          )}

        </Droppable>

      </DragDropContext>
    </div>
  );
}

export default App;
