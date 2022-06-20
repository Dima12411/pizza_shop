import React, {useContext, useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import {PizzasObject, SearchContext} from "../App";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {FilterInitialStateType, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, currentPage, sort} = useSelector<RootStateType, FilterInitialStateType>(state => state.filter)
    const sortType = sort.sortProperty


    const [items, setItems] = useState<Array<PizzasObject>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {searchValue} = useContext(SearchContext)

    /*const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }*/

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const fetchPizzas = () => {
        setIsLoading(true)

        const sortBy = sortType
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios
            .get(
                `https://62a07fa2a9866630f81099fb.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=asc${search}`
            )
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, searchValue, currentPage])

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find(obj => obj.sortProperty === params.sortType)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])



    const pizzas = items.map((el, index) => <PizzaBlock key={index} pizza={el}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination setCurrentPage={onChangePage}/>
        </div>
    );
};

export default Home;