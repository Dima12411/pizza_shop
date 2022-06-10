import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import {PizzasObject} from "../App";

export type sortByType = {
    name: string
    sortProperty: string
}

const Home = () => {
    const [items, setItems] = useState<Array<PizzasObject>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [categoryId, setCategoryId] = useState<number>(0)
    const [sortType, setSortType] = useState<sortByType>({
        name: 'популярности',
        sortProperty: 'rating'
    })

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://62a07fa2a9866630f81099fb.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=desc`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} setCategoryId={setCategoryId}/>
                <Sort sortType={sortType} setSortType={setSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((el, index) => <PizzaBlock key={index} pizza={el}/>)
                }
            </div>
        </div>
    );
};

export default Home;