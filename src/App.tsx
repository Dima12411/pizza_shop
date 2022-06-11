import React, {useState} from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export type PizzasObject = {
    id: number
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}
export type ArrayPizzas = Array<PizzasObject>

function App() {
    const [searchValue, setSearchValue] = useState<string>('')

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                    <Routes>
                        <Route path="/" element={ <Home searchValue={searchValue}/> }/>
                        <Route path="cart" element={ <Cart/> }/>
                        <Route path="*" element={ <NotFound/> }/>
                    </Routes>
            </div>
        </div>
    );
}

export default App;
