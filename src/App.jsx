// import Header from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import NeuralNetwork from "./components/Pages/NeuralNetwork";
import Advertising from "./components/Pages/Advertising";
import Education from "./components/Pages/Education";
import Promty from "./components/Pages/Promty";
import PromtyMidjourney from "./components/Pages/PromtyMidjourney"
import Neyroitem from "./components/Pages/Neyroitem";
import Generator from "./components/Pages/Generator";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"/neyron"} element={<NeuralNetwork />} />
        <Route path={"/Advertising"} element={<Advertising />} />
        <Route path={"/PromtyMidjourney"} element={<PromtyMidjourney/>} />
        <Route path={"/Education"} element={<Education />} />
        <Route path={"/Promty"} element={<Promty />} />
        <Route path={"/Neytroitem/:text"} element={<Neyroitem/>}/>
        <Route path={"/genrator/:text"} element={<Generator/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
