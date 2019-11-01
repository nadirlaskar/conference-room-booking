import React from "react";
import "./List.css";

function ListItem({ id, item }) {
  return item.name;
}
function List({ items, selected = null, onSelect=()=>{}, ItemRenderer = ListItem, data }) {
  return (
    <div className="List-main">
      {items.map((item, id) => {
        return (
          <div
            className={selected === id ? "List-item List-selected-item" : 'List-item'}
            key={id}
            onClick={() => onSelect(id, item)}
          >
            <ItemRenderer
              id={id}
              item={item}
              data={data}
            />
          </div>
        );
      })}
    </div>
  );
}

export default List;
