import React from "react";
import { FaEye, FaEyeSlash, FaPencilAlt, FaInfoCircle } from "react-icons/fa";
import Switch from "react-switch";


function ListSort() {
  const [Items, setItems] = React.useState([
    { id: 1, name: "Profile Summary", visible: true },
    { id: 2, name: "Academic and Cocurricular Activities", visible: true },
    { id: 3, name: "Summer Internship Experience", visible: true },
    { id: 4, name: "Work Experience", visible: true },
    { id: 5, name: "Project", visible: true },
    { id: 6, name: "Certifications", visible: true },
    { id: 7, name: "Leadership Positions", visible: true },
    { id: 8, name: "Extracurricular", visible: true },
    { id: 9, name: "Education", visible: true },
  ]);
  const [newItem, setNewItem] = React.useState("");
  const [editItemId, setEditItemId] = React.useState<number | null>(null);
  const [changedItemIds, setChangedItemIds] = React.useState<number[]>([]);

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

    if (!changedItemIds.includes(itemId)) {
      setChangedItemIds([...changedItemIds, itemId]);
    }
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

  // handle edit item
  const handleEditItem = (itemId: number | null) => {
    setEditItemId(itemId);
  };
  

  // handle save item
  const handleSaveItem = () => {
    setEditItemId(null);
    setChangedItemIds([]);
  };

  // handle cancel edit
  const handleCancelEdit = () => {
    setEditItemId(null);
    setChangedItemIds([]);
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
            <button className="info-button" title="Description of the center">
              <FaInfoCircle />
            </button>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleNameChange(e, item.id)}
              readOnly={editItemId !== item.id}
              style={{ border: "none", width: "300px" }} 
            />
            {editItemId === item.id ? (
              <>
                {changedItemIds.includes(item.id) && (
                  <button onClick={handleSaveItem}>Save</button>
                )}
              </>
            ) : (
              <button onClick={() => handleEditItem(item.id)}>
                <FaPencilAlt />
              </button>
            )}
            <Switch
              checked={item.visible}
              onChange={() => handleToggleVisibility(item.id)}
              onColor="#86d3ff"
              offColor="#dddddd"
              onHandleColor="#2693e6"
              offHandleColor="#ffffff"
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}

            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSort;
