import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import {PizzasObject} from "../App";

type PropsType = {
    searchValue: string
}

export type sortByType = {
    name: string
    sortProperty: string
}

const Home = ({searchValue, ...props}: PropsType) => {
    const [items, setItems] = useState<Array<PizzasObject>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [categoryId, setCategoryId] = useState<number>(0)
    const [sortType, setSortType] = useState<sortByType>({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const sortBy = sortType.sortProperty
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://62a07fa2a9866630f81099fb.mockapi.io/items?${category}&sortBy=${sortBy}&order=asc${search}`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])

    const pizzas = items.map((el, index) => <PizzaBlock key={index} pizza={el}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

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
                        ? skeletons
                        : pizzas
                }
            </div>
        </div>
    );
};

export default Home;