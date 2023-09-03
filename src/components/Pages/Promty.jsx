import React, { useState, useEffect } from "react";
import { Link, Outlet,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import seorchIcon from "../../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../../assets/img/svg/down-arrow-select.svg";
let BaseUrl = "http://64.226.102.92:8000/api/v1"
import ReactPaginate from 'react-paginate';
function Promty() {
   const [data ,setData] = useState([])
   const [category ,setCategory] = useState([])
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
     getCategory()
   },[])
   
   const getData =()=>{
    axios.get(BaseUrl + "/promt/list/").then((res)=>{
      setData(res.data.results)
      console.log(res.data.results)
    }).catch((err)=>{
      console.log(err)
    })
   }
   const getCategory =()=>{
    axios.get(BaseUrl + "/promt/category/").then((res)=>{
      console.log(res.data.results)
      setCategory(res.data.results)
    })
   }
   const handeleClick =(text)=>{
    navigate(`/genrator/${text}`)
   }
  const handleChange =(e)=>{
    axios.get(BaseUrl + '/promt/list/' + `?title=${e.target.value}`).then((res)=>{
       setData(res.data.results)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleSelect =(e)=>{
    axios.get(BaseUrl + '/promt/list/' + `?category_name=${e.target.value}`).then((res)=>{
      setData(res.data.results)
      console.log(res.data.results)
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
          <p className="navigation__strel"> <span onClick={()=>navigate('/')} className="cursor-span">Главная</span> -  <span onClick={()=>navigate('/Promty')} className="cursor-span">Промты</span> - <span className="active-span"> ChatGPT</span></p>
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
             onChange={(e) =>handleChange(e)}
            className="seorch__cart--input"
            type="text"
            placeholder="Поиск промтов"
          />
          <img srcSet={seorchIcon} alt="" />
        </div>
        <div className="wrapper__seorch--input">
          <select onChange={(e)=>handleSelect(e)} className="tasks" name="tasks" id="tasks">
            <option selected className="selected" value=" ">
            категория
            </option>
            {
              category?.map((item , index)=>(
                <option key={index} value={item.title}>{item.title}</option>
              ))
            }
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
      <ReactPaginate
      className='paginate'      
      pageCount={Math.ceil(data.length / itemsPerPage)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      activeClassName={'active-paginate'}
    />

      <Footer />
    </>
  );
}

export default Promty;
