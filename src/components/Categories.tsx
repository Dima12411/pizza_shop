import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {setCategoryId} from "../redux/slices/filterSlice";

const Categories = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector<RootStateType, number>(state => state.filter.categoryId)

    const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onClickCategory = (index: number) => {
        dispatch(setCategoryId(index))
    }

    return (
        <div className="categories">
            <ul>
                {
                    category.map((el, i) => {
                        return (
                            <li
                                key={i} className={categoryId === i ? 'active' : ''}
                                onClick={() => onClickCategory(i)}
                            >{el}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Categories;