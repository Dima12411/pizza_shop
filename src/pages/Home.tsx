import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import {PizzasObject, SearchContext} from "../App";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {InitialStateType, setCategoryId, SortType} from "../redux/slices/filterSlice";

const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector<RootStateType, InitialStateType>(state => state.filter)
    const sortType = sort.sortProperty


    const [items, setItems] = useState<Array<PizzasObject>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {searchValue} = useContext(SearchContext)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    const sortBy = sortType
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://62a07fa2a9866630f81099fb.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=asc${search}`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((el, index) => <PizzaBlock key={index} pizza={el}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading ? skeletons : pizzas }
            </div>
            <Pagination setCurrentPage={setCurrentPage}/>
        </div>
    );
};

export default Home;