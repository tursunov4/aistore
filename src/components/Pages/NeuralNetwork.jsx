import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Cartes from "../Cartes";
import Pagination from "./Pagination";
import axios from "axios";
import seorchIcon from "../../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../../assets/img/svg/down-arrow-select.svg";
import forAdults from "../../assets/img/svg/18+.svg";
import rus from "../../assets/img/svg/ru.svg";
import { useNavigate } from "react-router-dom";
import clock from "../../assets/img/svg/time.svg";
import free from "../../assets/img/svg/free.svg";
import money from "../../assets/img/svg/flag.svg";
let BaseUrl = "http://64.226.102.92:8000/api/v1"

export default function NeuralNetwork() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articlesPage, setArticlesPage] = useState(1);
  const [articlesParPage] = useState(12);
  const [searchValue, setSearchValue] = useState("");
  const [freeChked, sedFreeCheked] = useState(false);
  const [triallCheked, setTriallCheked] = useState(false);
   const [data ,setData] = useState([])
    const navigate = useNavigate()
  useEffect(()=>{
    getData()
  },[])  
   const getData =()=>{
    axios.get(BaseUrl + "/neauralnetwork/list/").then((res)=>{
      setData(res.data.results)
      console.log(res.data.results)
    }).then((res)=>{
      console.log(res.data)
    })
   }
  const handeClick =(text) => {
    navigate(`/Neytroitem/${text}`)
  }
  return (
    <>
      <div className="page__Promty">
        <div className="rang">
          <Header />
        </div>
        <div className="container ">
          <p className="navigation__strel">Главная --Нейросетм</p>
          <p className="name__Page">Нейросети</p>
          <p></p>
        </div>
      </div>
         <div className="section__cartes">
        <div className="cartes__inner">
          <div className="seorch__cart">
            <div className="wrapper__seorch--input">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="seorch__cart--input"
                type="text"
                placeholder="Поиск нейросетей"
              />
              <img srcSet={seorchIcon} alt="" />
            </div>
            <div className="wrapper__seorch--input">
              <select className="tasks" name="tasks" id="tasks">
                <option selected className="selected" value="1">
                  Задачи
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <img srcSet={dropDownSelect} alt="" />
            </div>
            <div className="wrapper__chekBox">
              <div className="chekBox__inner">
                <input
                  className="cheked"
                  value={freeChked}
                  onChange={() => handleCheked("free")}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>Бесплатно</p>
              </div>
              <div className="chekBox__inner">
                <input
                  className="cheked"
                  value={triallCheked}
                  onChange={() => handleCheked("triall")}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>Триал</p>
              </div>
            </div>
          </div>
          <p>Самые популярные нейросети</p>
          <div className="wrapper__oll--cartes">
          {
            data.map((item , index)=>(
              
             <div onClick={()=>handeClick(item.slug)} key={index} className="carts__warpper3">
             <img srcSet={item.image} alt="" />
   
             <h1 className="name__Ai">{item.title}</h1>
             <span className="cart__context">{item.description}</span>
             <div className="wrapper__bot">
               <span className="cart__bot">{item.zadacha}</span>
               { item.icon_18 &&
                     <img src={ forAdults } alt=""   />
                      }
                     { item.icon_ru  &&
                     <img src={ rus } alt=""   />
                      }
                     { item.free &&
                     <img src={ free } alt=""   />
                      }
                     { item.paid &&
                     <img src={ money } alt=""   />
                      }
                     { item.trail_18 &&
                     <img src={ clock } alt=""   />
                      }
             </div>
           </div>
            ))
          }
          
          </div>
        </div>
      </div>

      {/* <Pagination
        articlesParPage={articlesParPage}
        totalArticles={articles.length && articles.length}
        paginate={paginate}
      /> */}
      <Footer />
    </>
  );
}
