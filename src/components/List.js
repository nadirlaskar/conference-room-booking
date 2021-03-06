import React from "react";
import "./List.css";

function ListItem({ id, item }) {
  return item.name;
}
function List({ items, selected = null, onSelect=()=>{}, ItemRenderer = ListItem, data }) {
  return (
    <ul className="List-main">
      {items.map((item, id) => {
        return (
          <li
            className={selected === id ? "List-selected-item" : null}
            key={id}
            onClick={() => onSelect(id, item)}
          >
            <ItemRenderer
              id={id}
              item={item}
              data={data}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default List;
