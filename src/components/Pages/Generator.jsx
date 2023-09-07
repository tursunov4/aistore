import Header from "../Header"
import Footer from "../Footer"
import copy from '../../assets/img/svg/copy.svg'
import contat from '../../assets/img/png/contact.png'
import telegram from '../../assets/img/png/telegram.png'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
let BaseUrl = "http://64.226.102.92:8000/api/v1"
const Generator = () => {
    const { text} = useParams()
    const [data, setData] = useState({})
    const [data2 , setData2] = useState([])
    const [refresh , setRefresh] = useState(false)
    const [ru ,setRu] = useState('')
    const [eng , setEng] = useState('')
    const url = window.location.href;
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
        getData2()
      },[refresh])
    
      const getData =()=>{
        axios.get(BaseUrl + `/promt/detail/${text}/`).then((res)=>{
          console.log(res.data)
          setData(res.data)
          setRu(res.data.description_ru)
          setEng(res.data.description_en)
        }).catch((err)=>{

          console.log(err)
        })
      }
      const getData2 =()=>{
        axios.get(BaseUrl +`/promt/other/${text}/ `).then((res)=>{
          setData2(res.data.results)
          console.log(res.data.results)
    
        }).catch((res)=>{
          console.log(res)
        })
      }
      const handeleClick =(text)=>{
        setRefresh(!refresh)
        navigate(`/genrator/${text}`)
       }
       const rusCopy= () => {

        navigator.clipboard.writeText(ru)
      };
      const engCopy =()=>{
        navigator.clipboard.writeText(eng)
      }
      
  return (
    <div>
       
    <div className="rang">
      <Header />
    </div>
    <section className="generator-seciton">
    <div className="container__hug">
      <div className="genarator__wrap">
        <h2>{data.title}</h2>
        <div className="generator__wrap-inner">
         <div className="gener-iner__iner">
           <h3>Русский</h3>
           <div className="gener-iner__text">
            {data.description_ru}
           </div>
           <div onClick={()=>rusCopy()} className="gener-iner__copy">
            <img src={copy} alt="" />
            <span>Копировать</span>
           </div>
         </div>
         <div className="gener-iner__iner">
           <h3>Английский</h3>
           <div className="gener-iner__text">
           {data.description_en}
           </div>
           <div onClick={()=>engCopy()} className="gener-iner__copy">
            <img src={copy} alt="" />
            <span>Копировать</span>
           </div>
         </div>
        </div>
      </div>
      <div className="neyron-item__masange">
              <h3>Поделиться в соц.сетях</h3>
              <div className="neyron-item__masange-wrap">
                <a href={`https://vk.com/share.php?url=${url}&title=${data.title}`}><img src={contat} alt="" /></a>
                <a href={`https://telegram.me/share/url?url=${url}&text=${data.title}`} ><img src={telegram} alt="" /></a>
              </div>
      </div>
      <div className="drugiyi__promp">
        <h4>Другие промты</h4>

        <div className="wrapper__oll--cartes">
        {
          data2.map((item , index)=>(
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
      </div>
    </div>
    </section>
    <Footer/>
</div>
  )
}

export default Generator