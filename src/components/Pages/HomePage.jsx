import  { useState, useEffect } from "react";
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
  const navigate = useNavigate()
   const [button , setButto] = useState(0)
  const [trail ,setTrail] = useState(true)
  const [data ,setData] = useState([])
  const [free ,setFree] = useState(true)

  const [zadacha ,setZadacha] = useState([])
  const [title ,setTitle] = useState('')
  const [open ,setOpen] = useState(false)
  const handeClick =(text)=>{
      navigate(`/Neytroitem/${text}`)    
  }
 useEffect(()=>{
   getData()
   getZadacha()
 },[])
  const getData = ()=>{
    axios.get(BaseUrl +'/neauralnetwork/list/popular/').then((res)=>{
      setData(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  const handleChange =(e)=>{
    setTitle(e.target.value)
    axios.get(BaseUrl +'/neauralnetwork/list/popular/' + `?title=${e.target.value}` ).then((res)=>{
      console.log(res.data)
      setData(res.data)
    }).catch((err)=>{ 
      console.log(err)
    })

  }

  const getZadacha = ()=>{
    axios.get(BaseUrl + "/neauralnetwork/list/zadacha/").then((res)=>{
      setZadacha(res.data.results)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleSelect =(e)=>{
    console.log(e.target.value)
    axios.get(BaseUrl + '/neauralnetwork/list/popular/' + `?zadacha=${e.target.value}`).then((res)=>{
      console.log(res.data)
      setData(res.data)
    })
  }
  const handleOpen =()=>{
    setOpen(!open)
    if(open === true){
    axios.get(BaseUrl + "/neauralnetwork/list/popular/" + `?limit=12`).then((res)=>{
      setData(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    }
    else{
      axios.get(BaseUrl + '/neauralnetwork/list/popular/' ).then((res)=>{
       setData(res.data)
       console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  const freeChange =()=>{
    setFree(!free)
    axios.get(BaseUrl + "/neauralnetwork/list/popular/" + `?free=${free}`).then((res)=>{
       setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const trailChange =()=>{
    setTrail(!trail)
    axios.get(BaseUrl + '/neauralnetwork/list/popular/' + `?trail=${trail}`).then((res)=>{
       setData(res.data)
    })
  }
  const filtrType =(id)=>{
    setButto(id)
    if(id ===0){
    
      axios.get(BaseUrl +'/neauralnetwork/list/popular/').then((res)=>{
        setData(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    else(
      axios.get(BaseUrl + '/neauralnetwork/list/popular/' +  `?tag=${id}`).then((res)=>{
        setData(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    )
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
            <button onClick={()=>filtrType(0)} className= {button === 0 ? 'btn__filter active' :'btn__filter'}>Всем</button>
            <button onClick={()=>filtrType(1)} className= {button === 1 ? 'btn__filter active' :'btn__filter'}>Дизайнерам</button>
            <button onClick={()=>filtrType(2)} className= {button === 2 ? 'btn__filter active' :'btn__filter'}>Разработчикам</button>
            <button onClick={()=>filtrType(3)} className= {button === 3 ? 'btn__filter active' :'btn__filter'}>Копирайтерам</button>
            <button onClick={()=>filtrType(4)} className= {button === 4 ? 'btn__filter active' :'btn__filter'}>Для бизнеса</button>
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
              <select onChange={(e)=>handleSelect(e)} className="tasks" name="tasks" id="tasks">
                <option selected className="selected" value="">
                  Задачи
                </option>
                {
                  zadacha.map((item , index) =>(
                    <option value={item.zadacha} key={index}>
                      {item.zadacha}
                    </option>
                  ))
                }
               
              </select>
              <img srcSet={dropDownSelect} alt="" />
            </div>
            <div className="wrapper__chekBox">
              <div className="chekBox__inner">
                <input
                  className="cheked"
                  onChange={()=>freeChange()}
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
              data?.map((item, index) =>(
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
      <div onClick={()=>handleOpen()} className="wrapper__showOll--carts">
        <img className={open ? "trans" :''} src={homeImg} alt="" />
        <button className="show__oll--cats">{open ? "Вверх" :'Смотреть все'}</button>
        <img className={open ? 'trans' : ''} src={homeImg} alt=""  />
      </div>
      <Footer />
    </>
  );
}

export default headerSection;
