import React from "react";
import "./tailwind.index.css";

export default function AddItem(props) {
  return (
    <form onSubmit={props.onFormSubmit}>
      <div className="grid grid-cols-2 gap-1">
        <label htmlFor="item-name">Название:</label>
        <input
          type="text"
          value={props.name}
          onChange={props.onNameChange}
          id="item-name"
          placeholder="Название товара"
          className="textfield form-input rounded"
        />
      </div>
      <div  className="grid grid-cols-2 gap-1">
        <label htmlFor="item-description">Описание:</label>
        <input
          type="text"
          value={props.desc}
          onChange={props.onDescChange}
          id="item-description"
          placeholder="Описание товара"
          className="textfield form-input rounded"
        />
      </div>
      <div className="form-footer">
        <div className="validation">{props.valid}</div>
        <input type="submit" className="btn btn-basic rounded" value="Добавить" />
      </div>
    </form>
  );
}
