
import Header from "../Header"
import Footer from "../Footer"
import contat from '../../assets/img/png/contact.png'
import telegram from '../../assets/img/png/telegram.png'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import forAdults from "../../assets/img/svg/18+.svg";
import rus from "../../assets/img/svg/ru.svg";
import axios from "axios"
import clock from "../../assets/img/svg/time.svg";
import free from "../../assets/img/svg/free.svg";
import money from "../../assets/img/svg/flag.svg";
let BaseUrl = "http://64.226.102.92:8000/api/v1"
const Neyroitem = () => {
  const { text} = useParams()
  const [data , setData] = useState({})
  const [data2 ,setData2]= useState([])
  const [reklama ,setReklama] = useState([])
  const [refresh ,setRefresh] = useState(false)
  const url = window.location.href;
  console.log(url , "url")
  const navigate = useNavigate()
  useEffect(()=>{
    getData()
    getData2()
    getReklam()
  },[refresh])

  const getData =()=>{
    axios.get(BaseUrl + `/neauralnetwork/detail/${text}/`).then((res)=>{
      console.log(res.data)
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const getData2 =()=>{
    axios.get(BaseUrl +`/neauralnetwork/list/similar/${text}/?limit=3`).then((res)=>{
      setData2(res.data.results)
      console.log(res.data.results)
    }).catch((res)=>{
      console.log(res)
    })
  }
  const handeClick =(text)=>{
    navigate(`/Neytroitem/${text}`)
    setRefresh(!refresh)
  }
  const getReklam =()=>{
    axios.get(BaseUrl + "/neauralnetwork/list/adversiment/").then((res)=>{
      console.log(res.data , "rekalma")
      setReklama(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div>
       
        <div className="rang">
          <Header />
        </div>
        <section className="neyroitem-section">
        <div className="container__hug2">
          <div className="neyronitem__wrap">
            <div className="neyronitem__wrap-item">
              <div className="neyronitem__wrap-item1">
                   <h2>{data.title}</h2>
                <img src={data.image} alt="" />
                <div className="neyronitem__btns">
                  <span>{data.zadacha}</span>
               
                </div>
                <p>{data.description}</p>
                  <div className="neyronitem__footer-btns">
                    <button>Перейти на Contents </button>
                    { data.paid &&
                     <img src={ money } alt=""   />
                      }
                     { data.trail_18 &&
                     <img src={ clock } alt=""   />
                      }
                  </div>
              </div>
              <div className="neyronitem__reklamam">
                {
                  reklama.map((item , index) =>(

                <a key={index} href={item.link}>
                  <img className="neyro__reklamaimg" src={item.image} alt="" />
                </a>
                  ))
                }
              </div>
            </div>
            <div className="neyron-item__masange">
              <h3>Поделиться в соц.сетях</h3>
              <div className="neyron-item__masange-wrap">
                 <a href={`https://vk.com/share.php?url=${url}&title=${data.title}`}>
                 <img src={contat} alt="" />
                 </a>
                <a href={`https://telegram.me/share/url?url=${url}&text=${data.title}`}>
                <img src={telegram} alt="" />
                </a>
              </div>
            </div>
            <div className="neyron-item__masangerek">
            <h3>здесь могла быть ваша реклама</h3>
            </div>
            <div className="neyron-item__nerons">
              <h4>Похожие нейросети:</h4>
              <div className="wrapper__oll--cartes">
                 {                    
                      data2.map((item , index)=>(
                        
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
        </div>
        </section>
        <Footer/>
    </div>
  )
}

export default Neyroitem