import React, { useState, useEffect } from "react";
import axios from "axios";
import dropDown from "../../assets/img/svg/down-arrow.svg";
import Header from "../Header";
import Footer from "../Footer";
import homeImg from "../../assets/img/svg/down-arrow-cart.svg";
import seorchIcon from "../../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../../assets/img/svg/down-arrow-select.svg";
import forAdults from "../../assets/img/svg/18+.svg";
import rus from "../../assets/img/svg/ru.svg";
import clock from "../../assets/img/svg/time.svg";
import free from "../../assets/img/svg/free.svg";
import money from "../../assets/img/svg/flag.svg";
import { useNavigate } from "react-router-dom";
let BaseUrl = "http://64.226.102.92:8000/api/v1"

function headerSection() {
   const [button , setButto] = useState(0)
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("");
  const [freeChked, sedFreeCheked] = useState(false);
  const [triallCheked, setTriallCheked] = useState(false);
  const handleCheked = (cheked) => {};
  const [data ,setData] = useState([])

  const handeClick =(text)=>{
      navigate(`/Neytroitem/${text}`)    
  }
 useEffect(()=>{
   getData()
 },[])
  const getData = ()=>{
    axios.get(BaseUrl +'/neauralnetwork/list/').then((res)=>{
      setData(res.data.results)
      console.log(res.data.results)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleChange =(e)=>{
    axios.get(BaseUrl +'/neauralnetwork/list/' + `?title=${e.target.value}` , {
      search:`${e.target.value}`,
      limit:5
    }).then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <>
      <div className="sectionHome">
        <Header />
        <div className="container section__inf">
          <div className="section__inner">
            <h1 className="section__inf--text">Онлайн Каталог - Нейросети</h1>
            <h3 className="section__inf--content">
              Единая платформа для мощных нейросетей: Откройте мир беззграничных
              возможностей с нашим каталогом
            </h3>
          </div>
        </div>
        <div className=" container section__filter">
          <div className="filter__inner">
            <button onClick={()=>setButto(0)} className= {button === 0 ? 'btn__filter active' :'btn__filter'}>Всем</button>
            <button onClick={()=>setButto(1)} className= {button === 1 ? 'btn__filter active' :'btn__filter'}>Дизайнерам</button>
            <button onClick={()=>setButto(2)} className= {button === 2 ? 'btn__filter active' :'btn__filter'}>Разработчикам</button>
            <button onClick={()=>setButto(3)} className= {button === 3 ? 'btn__filter active' :'btn__filter'}>Копирайтерам</button>
            <button onClick={()=>setButto(4)} className= {button === 4 ? 'btn__filter active' :'btn__filter'}>Для бизнеса</button>
          </div>
          <button className="dropDownBnt">
            <img className="" srcSet={dropDown} alt="" />
          </button>
        </div>
      </div>
      <div className="section__cartes">
        <div className="cartes__inner">
          <div className="seorch__cart">
            <div className="wrapper__seorch--input">
              <input
                onChange={(e)=>handleChange(e)}
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
              data.map((item, index) =>(
                   <div  onClick={()=>handeClick(item.slug)} key={index} className="carts__warpper3">
                   <img  srcSet={item.image} alt="" />
         
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
      <div className="wrapper__showOll--carts">
        <img src={homeImg} alt="" />
        <button className="show__oll--cats">Смотреть все</button>
        <img src={homeImg} alt=""  />
      </div>
      <Footer />
    </>
  );
}

export default headerSection;
