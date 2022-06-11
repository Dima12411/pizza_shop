import React from 'react';
import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";

type PropsType = {
    setCurrentPage: (currentPage: number) => void
}

const Pagination = ({setCurrentPage, ...props}: PropsType) => {

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
                /*
                                renderOnZeroPageCount={null}
                */
            />
    );
};

export default Pagination;