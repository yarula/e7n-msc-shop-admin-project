import React, { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import AddItem from "./AddItem";
import Nav from "./Nav";
import "./tailwind.index.css";
import useFetch from "./hooks/useFetch";


export default function Shop() {
  function getFromLocalStorage(key, defaultValue = "[]") {
    return JSON.parse(localStorage.getItem(key) || defaultValue);
  }

  const [items, setItems] = useState(getFromLocalStorage("items", "[]"));
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [valid, setValid] = useState("");
  //const [loader, setLoader] = useState(false);

  const {get, post, loader} = useFetch()
  

  useEffect(() => {
    get("https://covid-shop-mcs.herokuapp.com")
    .then(data => {
      console.log(data)
      setItems(data)
    })
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

    post("https://covid-shop-mcs.herokuapp.com", {name, desc})
    .catch(error=>{
      console.error(`FAILED to save an item: ${error}`)
    })
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
    //localStorage.setItem("items", JSON.stringify(newItems));
  }

  return (
    <>
      <Nav/>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <div className="w-full">
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
         </div>
         <div className="w-full">
          <ItemsList items={items} onDeleteClick={handleDeleteClick} />
         </div>
        </div>
      </div>
    </>
  );
}
