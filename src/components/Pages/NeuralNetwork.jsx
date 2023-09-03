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
import free from "../../assets/img/svg/free.svg";
import money from "../../assets/img/svg/flag.svg";

let BaseUrl = "http://64.226.102.92:8000/api/v1"
import ReactPaginate from 'react-paginate';
export default function NeuralNetwork() {
   
   const [data ,setData] = useState([])
   const [zadacha ,setZadacha] = useState([])
   const [select , setSelect] = useState('')
   const [mapData , setMapData] = useState([])
   const [free ,setFree] = useState(true)
   const [trail ,setTrail] = useState(true)
   const [currentPage, setCurrentPage] = useState(0);
   const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const itemsPerPage = 12; // Number of items to display per page
const startIndex = currentPage * itemsPerPage;
const visibleItems = data.slice(startIndex, startIndex + itemsPerPage);
  const navigate = useNavigate()
  useEffect(()=>{
    getData()
    getZadacha()
  },[])  
   const getData =()=>{
    axios.get(BaseUrl + "/neauralnetwork/list/" ).then((res)=>{
      setData(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
   }
   const handleChange =(e)=>{
    
    axios.get(BaseUrl +'/neauralnetwork/list/' + `?title=${e.target.value}` ).then((res)=>{
      console.log(res.data)
      setData(res.data)
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
      console.log(res.data)
      setData(res.data)
    })
  }
  const handleChacked =()=>{
    setFree(!free)
    axios.get(BaseUrl + "/neauralnetwork/list/" + `?free=${free}`).then((res)=>{
       setData(res.data)
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
    setData(res.data)
  })
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
          <p>Самые популярные нейросети</p>
          <div className="wrapper__oll--cartes">
          {
            visibleItems?.map((item , index)=>(
              
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
          <ReactPaginate
      className='paginate'      
      pageCount={Math.ceil(data.length / itemsPerPage)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      activeClassName={'active-paginate'}
    />
      
        </div>
      </div>
      <Footer />
    </>
  );
}
