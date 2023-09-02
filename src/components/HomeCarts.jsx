import { useEffect, useState } from "react";
import seorchIcon from "../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../assets/img/svg/down-arrow-select.svg";
import forAdults from "../assets/img/svg/18+.svg";
import rus from "../assets/img/svg/ru.svg";
import clock from "../assets/img/svg/time.svg";
import free from "../assets/img/svg/free.svg";
import money from "../assets/img/svg/flag.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
let BaseUrl = "http://64.226.102.92:8000/api/v1"
const HomeCarts = ({ articles, loading }) => {
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

  return (
    <>
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
              data.map((item, index) =>(
                   <div  onClick={()=>handeClick(item.slug)} key={index} className="carts__warpper">
                   <img  srcSet={item.image} alt="" />
         
                   <h1 className="name__Ai">{item.title}</h1>
                   <span className="cart__context">{item.description}</span>
                   <div className="wrapper__bot">
                     <span className="cart__bot">{item.zadacha}</span>
                     <img
                       src={item.icon_18 ? forAdults : ""}
                       alt=""                    
                     />
                     <img src={item.icon_ru ? rus : ""} alt="" />
                     <img src={item.free ? free :''} alt=""  />
                     <img src={item.paid ? money :''} alt=""  />
                     <img src={item.trail ? clock : ''} alt=""  />
                   </div>
                 </div>
              ))


             }
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCarts;
