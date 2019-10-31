import React from "react";
import "./List.css";

function List({ items, selected = 0, onSelect }) {
  return (
    <ul className="List-main">
      {items.map((x, id) => (
        <li
          className={selected === id ? "List-selected-item" : ""}
          key={id}
          onClick={() => onSelect(id, x)}
        >
          {x.name}
        </li>
      ))}
    </ul>
  );
}

export default List;
