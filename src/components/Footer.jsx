import React from "react";
import logo from "../assets/img/svg/logo.svg";
import telegram from "../assets/img/svg/telegram.svg";
import { Link } from "react-router-dom";

function footer() {
  return (
    <>
      <footer>
        <div className="container footer__inner">
          <Link to={'/'} className="logo">
            <img src={logo} alt="logo" srcset="" />
          </Link>
          <nav className="menu menu__footer">
            <ul className="menu__list">
              <li>
                <Link to={'/neyron'} >Нейросети</Link>
              </li>
              <li>
                <Link to={'/Promty'} >Промты</Link>
              </li>
              <li>
                <Link to={'/Education'} >Обучение</Link>
              </li>
              <li>
                <Link to={'/Advertising'}>Реклама</Link>
              </li>
            </ul>
          </nav>
          <div className="footer__contactes">
            <div className="contactes">
              <p>Связаться с нами:</p>
              <div className="footer__social">
                <div className="footer__social-item">
                  <a  href="#">
                    <img srcSet={telegram} alt="telegram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer__public">
            <p>Вся информация взята из открытых источников.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default footer;
