import React, { memo } from "react";
import ReactPaginate from "react-paginate";
import './Styles/Pagination.css'
import styles from './Styles/Pagination.module.css';
const Pagination = ({pagination, updatePagination, total}) => {
    const handleChange = (e) => {
        const selected = e.selected;
        const offset = selected * pagination.size
        updatePagination(offset)
    }

    return (
        <div id="react-paginate" className={`row justify-content-center`}>            
            <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                breakLabel={<span className="gap">...</span>}
                pageCount={total/pagination.size}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handleChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName ={`${styles.pageClassName}`}
                previousClassName = {`${styles.previousClassName}`}
                nextClassName = {`${styles.nextClassName}`}
                activeClassName = {`${styles.activeClassName}`}
                breakClassName = {`${styles.breakClassName}`}
                activeLinkClassName = {`${styles.activeLinkClassName}`}
                renderOnZeroPageCount = {null}
            />
        </div>
    )
}
export default memo(Pagination);