import React from "react";
import "./List.css";

function ListItem({ selected, id, item, onSelect }) {
  return (
    <li
      className={selected === id ? "List-selected-item" : null}
      key={id}
      onClick={() => onSelect(id, item)}
    >
      {item.name}
    </li>
  );
}
function List({ items, selected = 0, onSelect, ItemRenderer = ListItem }) {
  return (
    <ul className="List-main">
      {items.map((item, id) => {
        return <ItemRenderer id={id} selected={selected} item={item} onSelect={onSelect} />
      })}
    </ul>
  );
}

export default List;
