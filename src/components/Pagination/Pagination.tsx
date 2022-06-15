import React from 'react';
import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

type PropsType = {
    setCurrentPage: (currentPage: number) => void
}

const Pagination = ({setCurrentPage, ...props}: PropsType) => {
    const currentPage = useSelector<RootStateType, number>(state => state.filter.currentPage)

    const onPageChangeHandler = (index: number) => {
        setCurrentPage(index + 1)
    }

    return (
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(e) => onPageChangeHandler(e.selected)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                /*
                                renderOnZeroPageCount={null}
                */
            />
    );
};

export default Pagination;