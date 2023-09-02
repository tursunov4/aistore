
import Header from "../Header";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import axios from "axios";
let BaseUrl = "http://64.226.102.92:8000/api/v1"
export default function PromtyMidjourney() {
  const [midjon ,setMidjon]= useState({})
  const [parametr , setParametr] = useState({})
  const [struk , setStruk] = useState({})
   
  useEffect(()=>{
   getMidjon()
   getParam()
   getStruk()
  } ,[])
  const getMidjon = ()=>{
    axios.get(BaseUrl + "/midjouney/midjouney/").then((res)=>{
      console.log(res.data)
      setMidjon(res.data.results)
    })
  }
  const getParam = ()=>{
    axios.get(BaseUrl +'/midjouney/parametr/').then((res)=>{
      setParametr(res.data.results)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })  
  }
  const getStruk =()=>{
    axios.get(BaseUrl + "/midjouney/struktura/").then((res)=>{
      console.log(res.data)
      setStruk(res.data.results)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      <div className="page__Promty--One">
        <div className="rang">
          <Header />
        </div>
        <div className="container">
          <p className="navigation__strel">Главная - Промты - Midjourney</p>
          <p className="name__Page">Промты</p>
          <div className="wrapper__Ai-novigation">
            <Link to="/Promty">ChatGPT</Link>
            <Link to="/PromtyMidjourney">Midjourney</Link>
          </div>
        </div>
      </div>
      <section className="midjourney">
        <div className="container__hug">
          <div className="midjourney__white">
            jee
          </div>
          <div className="midjourney__black">
            hee
          </div>
        </div>
      </section>
      <Footer/> 
    </>
  );
}
