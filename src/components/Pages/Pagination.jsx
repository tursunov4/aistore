import React from "react";

export default function Pagination({
  articlesParPage,
  totalArticles,
  paginate,
}) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesParPage); i++) {
    pageNumber.push(i);
  }

  return (
    <>
      <ul className="paginagtion">
        {pageNumber.map((number) => (
          <li
            className="page-item"
            onClick={() => paginate(number)}
            key={number}
          >
            <a className="page-link">{number}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
