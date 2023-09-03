import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/img/svg/logo.svg";
import ham from '../assets/img/svg/ham.svg'
import exit from '../assets/img/svg/exit.svg'

function Header() {
  const [openBurger, setOpenBurger] = useState(true);

  return (
    <>
      <header>
        {
          openBurger===false &&
        <div className="hamburger__div">
     
                <Link onClick={()=>setOpenBurger(true)} className="moblik" to="/neyron">Нейросети</Link>           
                <Link onClick={()=>setOpenBurger(true)} className="moblik" to="/Promty">Промты</Link>
                <Link onClick={()=>setOpenBurger(true)} className="moblik" to="/Education">Обучение</Link>
                <Link onClick={()=>setOpenBurger(true)} className="moblik" to="/Advertising">Реклама</Link>
        </div>
        }
        <div className="mobile__logo">
          <Link to={'/'}>
          <img src={logo} alt="" />
          </Link>
        </div>
        <div  onClick={()=>setOpenBurger(!openBurger)} className="hamburger">
          {
            openBurger ? <img src={ham} alt="das" /> : <img src={exit} alt="fsa"/>
          }
    
        </div>
        <div className="container header__inner">
              
          <nav className="menu">
            <ul className="menu__list">
              <li>
                <Link to="/neyron">Нейросети</Link>
              </li>
              <li>
                <Link to="/Promty">Промты</Link>
              </li>
              <a href="#" className="logo">
                <Link to="/">
                  
                  <img src={logo} alt="" srcset="" />
                </Link>
              </a>
              <li>
                <Link to="/Education">Обучение</Link>
              </li>
              <li>
                <Link to="/Advertising">Реклама</Link>
              </li>
            </ul>
              
          </nav>
        </div>
        <Outlet />
      </header>
    </>
  );
}

export default Header;
