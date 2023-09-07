import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import seorchIcon from "../../assets/img/svg/seorchIcon.svg";
import dropDownSelect from "../../assets/img/svg/down-arrow-select.svg";
let BaseUrl = "http://64.226.102.92:8000/api/v1"
import prevv from '../../assets/img/svg/prev.svg'
import nextt from '../../assets/img/svg/next.svg'
function Promty() {
   const [data ,setData] = useState([])
   const [category ,setCategory] = useState([])
   const [next ,setNext] = useState('')
   const [prev , setPrev] = useState('')
   const [count , setCount] = useState(1)
   const navigate = useNavigate()
   useEffect(()=>{
     getData()
     getCategory()
   },[])
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
   
   const getData =()=>{
    axios.get(BaseUrl + "/promt/list/").then((res)=>{
      setData(res.data.results)
      console.log(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      setCount(1)
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
       setNext(res.data.next)
       setPrev(res.data.previous)
       setCount(1)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleSelect =(e)=>{
    axios.get(BaseUrl + '/promt/list/' + `?category_name=${e.target.value}`).then((res)=>{
      setData(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
      setCount(1)
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
      <div className="pagination__mid">
            <button onClick={()=>prevClick()}>
              <img src={prevv} alt="" />
            </button>
             <span>{count}</span>
             <button onClick={()=>nextClick()}>
              <img src={nextt} alt="" />             
             </button>
           </div>

      <Footer />
    </>
  );
}

export default Promty;
