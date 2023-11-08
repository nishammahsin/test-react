import React, { useState } from "react";
const Item = (props) => {
    const [editItem, setEditItem] = useState({});
    const { items } = props;
    const handleClick = (index) => {
      const newArray = [...items];
      newArray[index].done = !newArray[index].done;
      setItems(newArray);
    };
    return (
      <>
        <table style={{ width: "100%" }}>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "45%" }}>Action</th>
          </tr>
          {items.map((item, index) => {
            return (
              <tr>
                <td>
                  <input
                    onClick={() => {
                      handleClick(index);
                    }}
                    type="checkbox"
                    checked={item.done}
                  />
                </td>
                <td>
                  {editItem.id === item.id ? (
                    <div>
                      <input
                        type="text"
                        // autoFocus
                        value={editItem.name}
                        onChange={(e) => {
                          setEditItem({ ...editItem, name: e.target.value });
                        }}
                      />
  
                      <button
                        onClick={() => {
                          ////
                          const newAry = [...items];
                          newAry[index].name = editItem.name;
                          setItems(newAry);
                          setEditItem({});
                        }}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <label
                      onClick={() => {
                        handleClick(index);
                      }}
                      style={{
                        textDecoration: item.done ? "line-through" : "none"
                      }}
                    >
                      {item.name}
                    </label>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      // setEditItemIndex(index);
                      setEditItem(item);
                    }}
                    style={{ backgroundColor: "lightblue" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Sure?")) {
                        toDoDelete(index);
                      }
                    }}
                    style={{ backgroundColor: "red" }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    );
  
    // return items.map((item, index) => {
    //   return (
    //     <div>
    //       <div
    //         onClick={() => {
    //           handleClick(index);
    //         }}
    //       >
    //         <input type="checkbox" checked={item.done} />
    //         <label
    //           style={{
    //             textDecoration: item.done ? "line-through" : "none"
    //           }}
    //         >
    //           {item.name}
    //         </label>
    //       </div>
    //       <button
    //         onClick={() => {
    //           setEditItemIndex(index);
    //         }}
    //         style={{ backgroundColor: "lightblue" }}
    //       >
    //         Edit
    //       </button>
    //       <button
    //         onClick={() => {
    //           if (confirm("Sure?")) {
    //             toDoDelete(index);
    //           }
    //         }}
    //         style={{ backgroundColor: "red" }}
    //       >
    //         X
    //       </button>
    //     </div>
    //   );
    // });
  };

  export default Item;