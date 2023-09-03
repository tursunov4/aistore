
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import midjoneyrasm from '../../assets/img/png/modjoyneyrasm.png'
import midjoyparam from '../../assets/img/png/midjoyparam.png'
import img71 from '../../assets/img/png/71.png'
import img72 from '../../assets/img/png/72.png'
import img73 from '../../assets/img/png/73.png'
let BaseUrl = "http://64.226.102.92:8000/api/v1"
export default function PromtyMidjourney() {
  const [midjon ,setMidjon]= useState([])
  const [parametr , setParametr] = useState([])
  const [pram2 ,setParam2] = useState([])
  const [pram3 ,setParam3] = useState([])
  const [pram4 , setParam4] = useState([])
  const [pram5 , setParam5] = useState([])
  const [struk , setStruk] = useState([])
  const [padrob , setPadrob] = useState([])
  const [pram6 ,setPram6] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
   getMidjon()
   getParam()
   getStruk()
   getPadrob()
  } ,[])
  const getMidjon = ()=>{
    axios.get(BaseUrl + "/midjouney/midjouney/").then((res)=>{
      console.log(res.data.results)
      setMidjon(res.data.results)
    })
  }
  const getParam = ()=>{
    axios.get(BaseUrl +'/midjouney/parametrone/').then((res)=>{
      setParametr(res.data.results)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })  
   axios.get(BaseUrl + '/midjouney/parametrtwo/').then((res)=>{
       setParam2(res.data.results)
   }).catch((err) =>{
    console.log(err)
   })
   axios.get(BaseUrl + "/midjouney/parametrthree/").then((res)=>{
    setParam3(res.data.results)
    console.log(res.data , "dfd")
   }).catch((err)=>{
    console.log(err)
   })
   axios.get(BaseUrl + "/midjouney/parametrfour/" ).then((res)=>{
      console.log(res.data)
     setParam4(res.data.results)
   }).catch((err)=>{
    console.log(err)
   })
   axios.get(BaseUrl + "/midjouney/parametrfive/" ).then((res)=>{
    console.log(res.data , "five")
    setParam5(res.data.results)
   }).catch((err)=>{
    console.log(err)
   })
   axios.get(BaseUrl + "/midjouney/parametrsix/" ).then((res)=>{
    console.log(res.data , "six")
    setPram6(res.data.results)
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
  const getPadrob = ()=>{
    axios.get(BaseUrl + "/midjouney/podrobno/").then((res) =>{
      setPadrob(res.data)
      console.log(res.data.results)
    }).catch((err) =>{
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
          <p className="navigation__strel"> <span onClick={()=>navigate("/")} className="cursor-span">Главная</span> - <span onClick={()=>navigate('/Promty')} className="cursor-span" >Промты </span>- <span className="active-span"> Midjourney</span></p>
          <p className="name__Page">Промты</p>
          <div className="wrapper__Ai-novigation">
            <Link to="/Promty">ChatGPT</Link>
            <Link to="/PromtyMidjourney">Midjourney</Link>
          </div>
        </div>
      </div>
      <section className="midjourney">
        <div className="container__hug2">

          <div className="midjourney__white">
              <span> /imagine prompt:</span> далее пишем запос
          </div>
          {
            midjon?.map((item , index)=>(
             <div key={index}>
               <div key={index} className="midjourney__black">
               <span>/imagine prompt: </span> {item.zapros}
               </div>
               <div className="midjourney__img2">
                <img src={item.otvet} alt="" />
               </div>
             </div>

            ))
          }
          <h3>Структура</h3>
          <div className="midjourney__white">
              <span>/imagine prompt: a+b+c </span> ( <span>a</span> — описывает то, что вы хотите и его характеристики, <span> b</span> — обеспечивает стиль изображения,
                    <span> с</span> — информация о размере, рендеринге и других параметрах
          </div>
          {
            struk?.map((item , index)=>(
              <div key={index}>
                 <div className="midjourney__black">
                  <span>/imagine prompt:</span>
                  {item.zapros}
                 </div>
                 <div className="midjourney__strukimg">
                  <img src={item.otvet} alt="" />
                 </div>
              </div>
            ))
          }
            <h3>Параметры</h3>
            <div className="midjourney__white">
            Используйте запятую, для мягкого разделения и :: для жесткого (обязательно отделяйте двоеточия пробелами)
            </div>  
            {
              parametr?.map((item, index) =>(
                <div key={index}>
                   <div className="midjourney__black">
                    <span>/imagine prompt:</span>{item.zapros}
                   </div>
                   <div className="midjourney__strukimg">
                  <img src={item.otvet} alt="" />
                 </div>
                </div>
              ))
            }
            <div className="midjourney__white">
              <span>--aspect</span> , или  <span>--ar</span> — генерирует изображения с желаемым соотношением сторон. Попробуйте, например, --ar 16:9, чтобы получить соотношение сторон 16:9.
            </div>  
            <div className="midjourney__white">
            <span> --w</span> и  <span> --h</span> — задает ширину и высоту изображения соответственно. Числа, используемые для <span>--h</span> и <span>--w</span>, должны находиться в диапазоне от <span> 256</span> до <span>2034</span>. Эти значения лучше работают при кратности <span>64</span> (или <span>128</span> для <span>--hd</span> ). Это более точная настройка. Например, написать  <span>--wallpaper</span> — это то же самое, что ввести <span>--w 1920 --h 1024 --hd</span>.
            </div>  
            <div className="midjourney__white">
            <span> --hd </span>— Использует другой алгоритм, который лучше всего подходит для абстрактных и пейзажных запросов. Он также генерирует изображения с более высоким разрешением без необходимости масштабирования.
            </div> 
            <div className="midjoypramimg">
              <img src={midjoyparam} alt="" />
            </div>
            <div className="midjourney__white">
            <span> --no </span> — Исключение чего-либо. Например <span>«--no people»</span> будет пытаться нарисовать картинку без людей. Эквивалентно использованию веса текста —  <span>people::-0.5</span>
            </div> 
            {              
              pram2?.map((item, index) =>(
                <div key={index}>
                   <div className="midjourney__black">
                    <span>/imagine prompt:</span>{item.zapros}
                   </div>
                   <div className="midjourney__strukimg">
                  <img src={item.otvet} alt="" />
                 </div>
                </div>
              ))
            }
              <div className="midjourney__white">
               <span>--video</span> — Сохраняет видео прогресса генерации. Чтобы сохранить видео, вы должны отреагировать конвертом ✉ на сообщение, чтобы получить ссылку на видео в личной переписке с ботом.
              </div>  
              <div className="midjourney__white">
              <span> --uplight</span> — спользует «лёгкое» увеличение при выборе кнопок U. Результаты становятся ближе к исходному изображению с меньшим количеством деталей, добавляемых во время масштабирования. Идеально подходит для лица и гладких поверхностей.
              </div>  
              <div className="midjourney__white">
             <span>  :: &lt; число &gt; </span> — Вы можете добавить суффикс от -1 до 2 к любой подсказке (без пробелов) , чтобы присвоить этой части вес, то есть важность той или иной подсказки перед другими. По умолчанию он равен 1. А значение -0,5 равно команде --no. 
              </div> 
              {
                pram3?.map((item , index) =>(
                <div key={index} className="midjourney__black">
                    <span>/imagine prompt:</span> {item.zapros}
                </div>
                ))
              } 
              <div className="midjourney__white">
           По данному запросу Midjourney попытается создать  <span>«горячую собаку»</span> буквально, не еду.
           </div> 
           <div className="midjourney__white">
           Добавьте один или несколько URL-адресов изображений перед основным текстом, и он будет использовать эти изображения в качестве визуального вдохновения. Параметр <span>--iw &lt; число &gt; </span> устанавливает вес подсказки изображения относительно веса текста. Значение по умолчанию <span>--iw 0.25</span>. 
           </div> 

           {
              pram4?.map((item , index) =>(
                <div key={index} className="midjourney__black">
                    <span>/imagine prompt:</span> {item.zapros}
                </div>
                ))
           }
            <div className="midjourney__white">
                 <span>  --q &lt; число &gt;</span>    — «качество» изображения в плане генерации. Диапазон от <span> 0.25</span> до  <span>5</span>. Базовое значение стоит на <span> 1</span>, а на <span> 5</span> он будет прорабатывать каждую картинку минут 5. 
           </div> 
            <div className="midjourney__white">
                 <span>   --chaos &lt; число &gt;</span>    — Насколько более разнообразными и случайными будут ваши результаты. Диапазон значений от <span> 0 </span>до  <span>100 </span>. Более высокие значения будут способствовать более интересным и необычным генерациям в обмен на более обособленные композиции. 
           </div> 
            <div className="midjourney__white">
            Использование низкого значения  <span>--chaos </span> или не указание значения приведет к созданию начальных сеток изображений, которые слегка изменяются при каждом запуске задания. 
           </div> 
           {
            pram5.map((item ,index)=>(
              <div key={index}>
                <div  className="midjourney__black">
                    <span>/imagine prompt:</span> {item.zapros}
                </div>
                <div className="midjourney__img6">
               {
                item.image.map((item , index)=>(
                  <img  key={index} src={item.otvet} alt="" />
                ))
               }
             </div>
              </div>
            ))
           }
            <div className="midjourney__white">
            При использовании более высокого значения  <span> --chaos</span> исходные сетки изображений будут более разнообразными и неожиданными при каждом запуске задания.
           </div> 
           {
            pram6.map((item ,index)=>(
              <div key={index}>
                <div  className="midjourney__black">
                    <span>/imagine prompt:</span> {item.zapros}
                </div>
                <div className="midjourney__img6">
               {
                item.otvet.map((item , index)=>(
                  <img  key={index} src={item.otvet} alt="" />
                ))
               }
             </div>
              </div>
            ))
           }
            <div className="midjourney__white">
            <span> --seed </span>— Устанавливает начальное значение, которое может помочь сохранить стабильность и воспроизводимость при повторной попытке создать нечто подобное. Это должно быть число между <span> 0</span> и  <span>4294967295  </span>. Если он не используется, вместо него будет выбрано случайное начальное число. Вы можете реагировать конвертом ✉ к сообщению задания, чтобы узнать, какое начальное значение было использовано.
           </div> 
            <div className="midjourney__white">
            <span> --sameseed</span> — Делает так, что бы начальное число одинаково влияло на все изображения результирующей сетки. Если он не используется, каждое изображение в сетке будет использовать разные «сиды», обеспечивая большее разнообразие.
           </div> 
            <div className="midjourney__white">
            <span> --s &lt; число &gt;</span> — Аргумент стилизации устанавливает, насколько сильна стилизация ваших изображений, чем выше вы установите его, тем более стилизованным оно будет. Значение по умолчанию —  <span>2500</span> . Примерный диапазон от <span> 625</span> до <span>20000</span>. 
           </div> 
            <div className="midjourney__white">
             <span>--stop</span> — Остановить генерацию раньше. Значения от <span>10</span> до  <span>100</span>.
           </div> 
            <div className="midjourney__white">
             <span>--q</span> — задаёт, сколько времени на качественный рендеринг вы хотите потратить. Доступные значения: <span>«0.25», «0.5», «1», «2», «5»</span>. По умолчанию установлено <span>--q 1</span>. Более высокие значения стоят дороже, а более низкие — дешевле. При большой скорости заметно теряется качество картинки. Ниже примеры для значений  <span>--q 0.5, --q 1</span> и <span>--q 2</span>.
           </div> 
             <div className="midjourney__img6">
               <img src={img71} alt="" />
               <img src={img72} alt="" />
               <img src={img73} alt="" />
             </div>
             <div className="midjourney__white">
             <span>--fast </span>— изображения получатся быстрее и дешевле, но худшего качества. Вы также можете использовать <span>--q 0.5</span> или <span>--q 0.25</span> для аналогичного результата.
           </div> 

             

          <h3>Подробнее, как добавить вес слову</h3>
          {
              padrob?.map((item , index) =>(
                <div key={index}>
                   <div className="midjourney__black">
                      <span>/imagine prompt:</span> {item.zapros}
                    </div>  
                   <div className="midjourney__white">
                      {item.otvet}
                    </div>  
                  
               </div>
              ))
          }
           
             
          <h3>Остальные команды:</h3>
          <div className="midjourney__white">
           <span>/ask </span> — можно задать вопрос, касающийся данной нейросети
          </div>
          <div className="midjourney__white">
           <span>/blend </span>— объединяет 2-3 изображения
          </div>
          <div className="midjourney__white">
           <span>/describe</span>   — после этой команды вы сможете загрузить изображение, а в ответе бот пришлет вам четыре варианта запроса, каждый из которых достаточно детально описывает это изображение.
          </div>
          <div className="midjourney__white">
           <span>/help </span>   /help — небольшой FAQ о нейросети
          </div>
          <div className="midjourney__white">
           <span>/prefer option set</span>  — создает персональную опцию, которая затем преобразуется в заданное вами значение, когда вы вызываете её, добавляя к ней символ «--» без кавычек. Например, <span> /prefer option set mine --hd --ar 16:9</span> создает опцию под названием «<span>mine</span>», которая переводится как <span>--hd --ar 16:9</span>. Поэтому вы можете использовать <span>/imagine rubber ducks are awesome --mine</span> и это будет точно так же, как если бы вы сделали <span>/imagine rubber ducks are awesome --hd --ar 16:9</span>. Чтобы удалить опцию, после слова <span>set</span> поставьте <span> пробел</span>;
          </div>
          <div className="midjourney__white">
            <span>/prefer option list</span> — показывает активные персональные настройки
          </div>
          <div className="midjourney__white">
            <span>/prefer audo_dm</span>  — вкл/выкл режима «Отправить результат личным сообщением»
          </div>
          <div className="midjourney__white">
            <span>/prefer remix</span> — включает режим «Remix mode» (объединение изображений между собой или создание комбинации с уже готовыми картинками)
          </div>
          <div className="midjourney__white">
            <span>/public </span> — ваш результат увидят все участники комнаты
          </div>
          <div className="midjourney__white">
            <span>/show  </span> — позволяет продолжить работу с уже сгенерированным изображением, если есть его id
          </div>
          <div className="midjourney__white">
            <span>/subscribe </span>  — оформить подписку нейросети Midjourney
          </div>
          <div className="midjourney__white">
            <span> /settings  </span>— покажет настройки этого бота в виде кнопок
          </div>
           <div className="mojourney__img">
            <img src={midjoneyrasm} alt="" />
           </div>
          <div className="midjourney__white">
          <span> --v </span>— Версии <span>с 1 по 3 </span>— это развитие прошлой архитектуры Midjourney, <span>с 4</span> — полностью «переписанный» AI с новой огромной базой для обучения. <span>Niji</span> — это модель, которая обучена для создание изображений в стиле манги и аниме.
           Тестовые модели — «временные», созданные для тестирования и сбора обратной связи, но могут подойти экспериментаторам. <span> Test </span> — более «художественная» с высоким соответствием текстовому запросу. <span>Test Photorealistic</span>  генерирует фотореалистичные результаты.
          </div>
          <div className="midjourney__white">
           <span>--q </span> — Устанавливает качество генерации изображений. Чем выше качество, тем лучше нейросеть проработает детали, но тем больше будет потрачено времени тарифа. <span>“Half quality”</span> соответствует <span> 0.5</span> , <span>“Base” — 1</span>, <span>“High” — 2</span> . По умолчанию выбран  <span>“Base quality”</span> .
          </div>
          <div className="midjourney__white">
          <span> --s</span> — По умолчанию выставлен средний уровень стилиации <span>“Style med”</span> . В четвертой и выше версиях <span>“Style low”</span> соответствует значению <span>50</span> ,  <span> “Medium” — 100, “High” — 250, “Very high” — 750</span> . Максимальный уровень в этой модели — <span>1000</span> .
          </div>
          <div className="midjourney__white">
           <span>   /public </span> — По умолчанию вы используете публичный режим — <span>“Public mode”</span> . В этом режиме любая генерация изображения, не важно где она сделана — в дискорде Midjourney, на вашем собственном сервере или в личных сообщениях бота — будет видна в галерее на сайте <a href="https://www.midjourney.com/home/?callbackUrl=%2Fapp%2F">Midjourney.com</a> . <br />
                <span>/stealth</span> — Режим скрытности или <span>“Stealth mode”</span> позволяет скрывать ваши генерации из галереи, режим доступен только в подписке “Pro”
          </div>
          <div className="midjourney__white">
            <span> /remix </span> — Если вы включите режим ремикса, то перед тем как создать вариации по кнопке V1-V4, бот откроет окно с первоначальным запросом, который можно изменить, а картинка, которую вы выбрали для создания вариаций, станет эталонным изображением для этого запроса.
          </div>
          <div className="midjourney__white">
           <span>/relax </span> — Переключение в «расслабленный» режим генерации. В этом режиме не тратятся минуты тарифного плана. Доступно только если ваша подписка — это “Standard” или “Pro”. <br />
               <span>/fast — ”Fast mode” </span>  — в этом режиме запрос попадает в очередь на быструю генерацию, которая расходует эти минуты. Время в очереди и время самой генерации обычно занимает от 30 до 60 секунд.
          </div>
        </div>
      </section>
      <Footer/> 
    </>
  );
}
