import React, {useState} from 'react';

const Categories = () => {

    const [activeIndex, setActiveIndex] = useState<number>(0)

    const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onClickCategory = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {
                    category.map((el, i) => {
                        return (
                            <li className={activeIndex === i ? 'active' : ''}
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