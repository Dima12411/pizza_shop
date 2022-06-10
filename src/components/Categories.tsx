import React, {useState} from 'react';

type PropsType = {
    categoryId: number
    setCategoryId: (categoryId: number) => void
}

const Categories = ({categoryId, setCategoryId, ...props}: PropsType) => {

    const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onClickCategory = (index: number) => {
        setCategoryId(index)
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