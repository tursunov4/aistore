import React, { useState, useEffect } from "react";
import seorchIcon from "../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../assets/img/svg/down-arrow-select.svg";

const GptCart = (articles, loading) => {
  const gptCarts = articles.articles;
  console.log(gptCarts)
  let salom = gptCarts.map((articl) => {
    return (
      <div className="carts__warpper">
        <span className="cart__bot">{articl.NameAi}</span>
        <h1 className="name__Promts">{articl.title}</h1>
        <span className="cart__context">{articl.description_ru}</span>
        <a className="bootom__cartGpt" href="#">
          Подробнее
        </a>
      </div>
    );
  });

  return (
    <>
      <div className="seorch__cart">
        <div className="wrapper__seorch--input">
          <input
            className="seorch__cart--input"
            type="text"
            placeholder="Поиск промтов"
          />
          <img srcSet={seorchIcon} alt="" />
        </div>
        <div className="wrapper__seorch--input">
          <select className="tasks" name="tasks" id="tasks">
            <option selected className="selected" value="tasks">
              Задачи
            </option>
            <option value="tasks">2</option>
            <option value="tasks">3</option>
          </select>
          <img srcSet={dropDownSelect} alt="" />
        </div>
      </div>
      <div className="wrapper__oll--cartes">
      <div className="carts__warpper">
        <span className="cart__bot">{articl.NameAi}</span>
        <h1 className="name__Promts">{articl.title}</h1>
        <span className="cart__context">{articl.description_ru}</span>
        <a className="bootom__cartGpt" href="#">
          Подробнее
        </a>
      </div>
      </div>
    </>
  );
};
export default GptCart;
