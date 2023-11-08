import { useState, useEffect, useReducer } from "react";
import Item from "./Item";
/**
 * A component that renders a todo list with the ability to add, edit, and delete items.
 * @param {Object} props - The props object.
 * @returns {JSX.Element} - The List component.
 */


const reducer = (state, action) => {
  console.log('state', state);
  console.log('action', action);
  if(action.type === 'ADD'){
    return [...state, action.payload];
  } 
}
const List = (props) => {
  const [newItem, setNewItem] = useState("");

  const [updateItemName, setUpdateItemName] = useState("");
  const [editItemIndex, setEditItemIndex] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);

  const [state , dispatch ] = useReducer(reducer, []);



  const [items, setItems] = useState([]);

  

  useEffect(() => {
    console.log(editItemIndex);

    if (editItemIndex !== "") {
      setShowEditInput(true);

      const findVal = items[editItemIndex].name;

      setUpdateItemName(findVal);
    } else {
      setShowEditInput(false);
    }
  }, [editItemIndex]);

  const addToTodo = () => {
    const obj = { name: newItem, done: false, id: Math.floor(Math.random() * 1000000) };
    const updatedItems = [...items, obj];
    //setItems(updatedItems);
    console.log('obj', obj);
    dispatch({ type: "ADD", payload: obj });
  };

  const changeItemName = (event) => {
    setUpdateItemName(event.target.value);
  };

  /**
   * Updates the name of a todo item at a given index and sets the updated items in state.
   */
  const updateTodo = () => {
    const itemIndex = editItemIndex;
    const prevItems = [...items];
    prevItems[itemIndex].name = updateItemName;
    
    // setItems(prevItems);
    // setEditItemIndex("");
  };

  const addNewItem = (event) => {
    setNewItem(event.target.value);
  };

  const toDoDelete = (i) => {
    const updatedItems = items.filter((item, index) => index !== i);
    
    // setItems(updatedItems);
  };

  // fetch data from a sample api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        const newItems = json.map((item) => {
          return { name: item.title, done: item.completed, id: item.id };
        });
        console.log(newItems);
        setItems(newItems);
      });
  }, []);
  return (
    <div>

      <input
        type="text"
        value={newItem}
        name="new_item"
        onChange={addNewItem}
      />
      <button type="button" onClick={addToTodo}>
        Add to Todo
      </button>
      {showEditInput ? (
        <>
          <input
            type="text"
            value={updateItemName}
            name="new_item"
            onChange={changeItemName}
          />
          <button type="button" onClick={updateTodo}>
            Update Todo
          </button>
        </>
      ) : (
        ""
      )}
      <br />
      <br />
      <div
       
      >
        {<Item items={state} />}
      </div>
    </div>
  );
};

export default List;
