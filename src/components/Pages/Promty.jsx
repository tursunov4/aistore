import React, { useState, useEffect } from "react";
import { Link, Outlet,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";

import seorchIcon from "../../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../../assets/img/svg/down-arrow-select.svg";
let BaseUrl = "http://64.226.102.92:8000/api/v1"

function Promty() {
   const [data ,setData] = useState([])
   const navigate = useNavigate()
   useEffect(()=>{
     getData()
   },[])
   
   const getData =()=>{
    axios.get(BaseUrl + "/promt/list/").then((res)=>{
      setData(res.data.results)
      console.log(res.data.results)
    }).then((res)=>{
      console.log(res.data)
    })
   }
   const handeleClick =(text)=>{
    navigate(`/genrator/${text}`)
   }

 
  return (
    <>
      <div className="page__Promty--One">
        <div className="rang">
          <Header />
        </div>
        <div className="container">
          <p className="navigation__strel">Главная - Промты - ChatGPT</p>
          <p className="name__Page">Промты</p>
          <div className="wrapper__Ai-novigation">
            <Link to="/Promty">ChatGPT</Link>
            <Link to="/PromtyMidjourney">Midjourney</Link>
          </div>
        </div>
      </div>
      {/* <GptCart articles={articles} loading={loading} /> */}
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
        {
          data.map((item , index)=>(
            <div onClick={()=>handeleClick(item.slug)} key={index} className="carts__warpper3">

        <span className="cart__bot">{item.category.title}</span>
        <h1 className="name__Promts">{item.title}</h1>
        <span className="cart__context2">{item.description_ru}</span>
        <a className="bootom__cartGpt" href="#">
          Подробнее
        </a>
            </div>
          ))
        }
      </div>

      <Footer />
    </>
  );
}

export default Promty;
