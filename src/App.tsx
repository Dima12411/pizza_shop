import React, {useEffect, useState} from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./pizzaBlock/PizzaBlock";
import pizzas from './assets/pizzas.json'

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
    const [items, setItems] = useState<Array<PizzasObject | null>>([])

    useEffect(() => {
        fetch('https://62a07fa2a9866630f81099fb.mockapi.io/items')
            .then(res => res.json())
            .then(res => {
                setItems(res)
            })
    }, [])

  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    pizzas.map(el => {
                        return (
                            <PizzaBlock
                                key={el.id}
                                pizza={el}
                            />
                        )
                    })
                }
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
