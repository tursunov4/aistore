import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import seorchIcon from "../../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../../assets/img/svg/down-arrow-select.svg";
import forAdults from "../../assets/img/svg/18+.svg";
import rus from "../../assets/img/svg/ru.svg";
import { useNavigate } from "react-router-dom";
import clock from "../../assets/img/svg/time.svg";
import freee from "../../assets/img/svg/free.svg";
import money from "../../assets/img/svg/flag.svg";
import prevv from '../../assets/img/svg/prev.svg'
import nextt from '../../assets/img/svg/next.svg'
let BaseUrl = "http://64.226.102.92:8000/api/v1"
export default function NeuralNetwork() {
   
   const [data ,setData] = useState([])
   const [zadacha ,setZadacha] = useState([])
   const [select , setSelect] = useState('')
   const [free ,setFree] = useState(true)
   const [trail ,setTrail] = useState(true)
   const [next ,setNext] = useState('')
   const [prev , setPrev] = useState('')
   const [count , setCount] = useState(1)
   const [paginate , setPaginate] = useState(true)
  
  const navigate = useNavigate()
  useEffect(()=>{
    getData()
    getZadacha()
  },[])  
   const getData =()=>{
    axios.get(BaseUrl + "/neauralnetwork/list/" ).then((res)=>{
      setData(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      setPaginate(true)
      setCount(1)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
   }
   const handleChange =(e)=>{
    axios.get(BaseUrl +'/neauralnetwork/list/' + `?title=${e.target.value}` ).then((res)=>{
      console.log(res.data.results)
      setData(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      setPaginate(true) 
      setCount(1)
    }).catch((err)=>{ 
      console.log(err)
    })
  }
  const getZadacha =()=>{
    axios.get(BaseUrl + "/neauralnetwork/list/zadacha/" ).then((res)=>{
      setZadacha(res.data.results)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleSelect =(e) =>{
    setSelect(e.target.value)
    axios.get(BaseUrl + '/neauralnetwork/list/' + `?zadacha=${e.target.value}`).then((res)=>{
      console.log(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      setCount(1)
      setData(res.data.results)

    })
  }
  const handleChacked =()=>{
    setFree(!free)
    axios.get(BaseUrl + "/neauralnetwork/list/" + `?free=${free}`).then((res)=>{
       setData(res.data.results)
       setNext(res.data.next)
       setPrev(res.data.previous)
       setPaginate(true)
       setCount(1)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handeClick =(text) => {
    navigate(`/Neytroitem/${text}`)
  }
 const trailChange =()=>{
  setTrail(!trail)
  axios.get(BaseUrl + "/neauralnetwork/list/" + `?trail=${trail}`).then((res)=>{
    setData(res.data.results)
    setNext(res.data.next)
    setPrev(res.data.previous)
    setPaginate(true)
    setCount(1)
  }).catch(err=>{
    console.log(err)
  })
 }
 const getPopular =()=>{
  axios.get(BaseUrl + "/neauralnetwork/list/popular/").then((res)=>{
    setData(res.data)
    setPaginate(false)
    setCount(1)
    console.log(res.data)
  }).catch((err) =>{
    console.log(err)
  })
 }
 const prevClick=()=>{
  if(prev){
    axios.get(prev).then((res)=>{
      console.log(res.data)
      setData(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      if(res.status === 200){
        setCount(prev=> prev-1)
      }
    })
  }
 }
 const nextClick=()=>{
  if(next){
    axios.get(next).then((res)=>{
      console.log(res.data)
      setData(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      if(res.status === 200){
        setCount(prev=> prev+1)
      }
    })
  }
 }
  return (
    <>
      <div className="page__Promty">
        <div className="rang">
          <Header />
        </div>
        <div className="container ">
          <p className="navigation__strel"> <span onClick={()=>navigate('/')} className="cursor-span">Главная </span> - <span  className="active-span">Нейросетм</span></p>
          <p className="name__Page">Нейросети</p>
          <p></p>
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
              <select onChange={(e)=>handleSelect(e)} className="tasks" name="tasks" id="tasks">
                <option selected className="selected" value="">
                  Задачи
                </option>
                 {
                  zadacha.map((item , index) =>(
                    <option key={index}>{item.zadacha}</option>
                  ))
                 }
              </select>
              <img srcSet={dropDownSelect} alt="" />
            </div>
            <div className="wrapper__chekBox">
              <div className="chekBox__inner">
                <input
                  className="cheked"          
                  onChange={(e)=>handleChacked(e)}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>Бесплатно</p>
              </div>
              <div className="chekBox__inner">
                <input
                  className="cheked"            
                 onChange={()=>trailChange()}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>Триал</p>
              </div>
            </div>
          </div>
          <p onClick={()=>getPopular()}>Самые популярные нейросети</p>
          <div className="wrapper__oll--cartes">
          {
            data?.map((item , index)=>(
              
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
                     <img src={ freee } alt=""   />
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
          {
            paginate &&
            <div className="pagination__mid">
            <button onClick={()=>prevClick()}>
              <img src={prevv} alt="" />
            </button>
             <span>{count}</span>
             <button onClick={()=>nextClick()}>
              <img src={nextt} alt="" />             
             </button>
           </div>
        
          }
        </div>
      </div>
      <Footer />
    </>
  );
}
