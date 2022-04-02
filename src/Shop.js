import React, { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import AddItem from "./AddItem";

export default function Shop() {
  function getFromLocalStorage(key, defaultValue = "[]") {
    return JSON.parse(localStorage.getItem(key) || defaultValue);
  }

  const [items, setItems] = useState(getFromLocalStorage("items", "[]"));
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [valid, setValid] = useState("");

  useEffect(() => {
    const itemsString = localStorage.getItem("items") || "[]";
    console.log(itemsString);
    setItems(JSON.parse(itemsString));
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      document.title = "Товары отсутствуют";
    } else {
      document.title = `${items.length} товаров`;
    }
    console.log(document.title);
  }, [items]);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!name) {
      setValid("Введите название");
      return;
    }
    if (!desc) {
      setValid("Введите описание ");
      return;
    }
    const newItems = [
      ...items,
      {
        id: items.length + 1,
        name: name,
        desc: desc
      }
    ];

    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    setName("");
    setDesc("");
    setValid("");
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescChange(event) {
    setDesc(event.target.value);
  }

  function handleDeleteClick(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }

  return (
    <>
      <h1 className="text-5xl font-bold underline">Admin Page</h1>
      <AddItem
        name={name}
        desc={desc}
        valid={valid}
        onNameChange={handleNameChange}
        onDescChange={handleDescChange}
        onFormSubmit={handleFormSubmit}
      />
      <div>
        {items.length === 0 && (
          <p className="text-blue-400 font-extrabold">Добавьте первый товар</p>
        )}
      </div>
      <ItemsList items={items} onDeleteClick={handleDeleteClick} />
    </>
  );
}
