import  { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import hend from "../../assets/img/svg/hend.svg";
import { useNavigate } from "react-router-dom";


let BaseUrl = "http://64.226.102.92:8000/api/v1"
export default function Advertising() {
  const [data ,setData] = useState([])
  useEffect(()=>{
   getData()
 },[])  
  const getData =()=>{
   axios.get(BaseUrl + "/advertisement/list/").then((res)=>{
     setData(res.data.results)
     console.log(res.data.results)
   }).catch((err)=>{
     console.log(err)
   })
  }
  const navigate = useNavigate()
  return (
    <>
      <div className="page__Promty">
        <div className="rang">
          <Header />
        </div>
        <div className="container">
          <p className="navigation__strel"> <span onClick={()=>navigate('/')} className="cursor-span">Главная</span> -- <span className="active-span"> Реклама</span></p>
          <p className="name__Page">Реклама</p>
        </div>
      </div>
      <div className="wrapper__contact">
        <a  href="https://t.me/ai_store1" className="wrapper__inner">
          <p className="education__text">
            Если у вас есть продукт или услуга, которую можно продвигать через
            рекламу
          </p>
          <p className="education__text--end">
            Напиши нам о своём курсе и мы разместим у себя на сайте
          </p>
          <div className="wrapper__telegram--coll">
            <div className="bacgraund__telegram--inner">
              <img srcSet={hend} alt="" />
            </div>
          </div>
        </a>
      </div>
      <div className="wrapper__oll--cartes">
        {
          data.map((item , index)=>(

          <div key={index} className="carts__warpper3">
            <img srcSet={item.image} alt="" />
            <h1 className="name__Ai">{item.title}</h1>
            <span className="cart__context">{item.description}</span>
          </div>
          ))
        }

    
     
      </div>
      <Footer />
    </>
  );
}
