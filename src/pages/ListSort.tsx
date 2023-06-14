import React from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ListSort() {
  const [Items, setItems] = React.useState([
    { id: 1, name: "Profile", visible: true },
    { id: 2, name: "Summary", visible: true },
    { id: 3, name: "Project", visible: true },
  ]);
  const [newItem, setNewItem] = React.useState("");

  // save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  // handle drag sorting
  const handleSort = () => {
    // duplicate items
    let _Items = [...Items];

    // remove and save the dragged item content
    const draggedItem = _Items.splice(dragItem.current, 1)[0];

    // switch the position
    _Items.splice(dragOverItem.current, 0, draggedItem);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    setItems(_Items);
  };

  // handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const updatedItems = Items.map((item) => {
      if (item.id === itemId) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // handle toggle visibility
  const handleToggleVisibility = (itemId: number) => {
    const updatedItems = Items.map((item) => {
      if (item.id === itemId) {
        return { ...item, visible: !item.visible };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // handle new item addition
  const handleAddItem = () => {
    const newItems = { id: Date.now(), name: newItem, visible: true };
    const updatedItems = [...Items, newItems];
    setItems(updatedItems);
    setNewItem("");
  };

  return (
    <div className="app">
      <h1>Select Your Section</h1>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
      <div className="list-sort">
        {Items.map((item, index) => (
          <div
            key={item.id}
            className="list-item"
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <i className="fa-solid fa-bars"></i>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleNameChange(e, item.id)}
            />
            <button onClick={() => handleToggleVisibility(item.id)}>
             {item.visible ? <FaEye /> : <FaEyeSlash />}
            </button>
            

          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSort;
