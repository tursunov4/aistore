import React from "react";

const EducationCart = (articles, loading) => {
  const educationCarts = articles.articles;

  return (
    <div className="wrapper__oll--cartes">
      {educationCarts.map((obj,i) => {
        return (
          <div className="carts__warpper">
            <img srcSet={obj.image} alt="" />
            <h1 className="name__Ai">{obj.title}</h1>
            <span className="cart__context">{obj.description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default EducationCart;
