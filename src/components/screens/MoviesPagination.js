import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Styles/Pagination.css'
import MovieCard from './MovieCard';
import styles from './Styles/MoviePagination.module.css'
function MoviesPagination(props) {
    const[movies_data,setMoviesData]=useState(props.movies_data)
    const [pagination, setPagination] = useState({
        data: props.movies_data,
        offset: 0,
        numberPerPage: 32,
        pageCount: 0,
        currentData: []
    });
    

    useEffect(() => {
        setPagination((prevState) => ({
        ...prevState,
        pageCount: movies_data.length / prevState.numberPerPage,
        currentData: movies_data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
    }, [pagination.numberPerPage, pagination.offset])


    const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    return (
        <div className="container">
            <div className="row">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb cust_breadcrumb">
                        <li class="breadcrumb-item "><Link to='/' className="cust_breadcrumb_link">Home</Link></li>
                        <li class="breadcrumb-item text-light active" aria-current="page">Movies</li>
                    </ol>
                </nav>
                <div className="col-12">
                    <h3 className="main_heading">Movies</h3>
                    <hr />
                </div> 
            </div>
            <div className="row justify-content-center">
                {pagination.currentData && pagination.currentData.map(((item, index) => (
                    <div className="col-6 col-md-3  py-3"  key={item._id}>
                        {/* <RenderMovie movie={item}  /> */}
                        <MovieCard movie={item}/>
                    </div>
                )))
                }
            </div>
            
            <div id="react-paginate" className={`row justify-content-center`}>
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={pagination.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName ={`${styles.pageClassName}`}
                    previousClassName = {`${styles.previousClassName}`}
                    nextClassName = {`${styles.nextClassName}`}
                    activeClassName = {`${styles.activeClassName}`}
                    breakClassName = {`${styles.breakClassName}`}
                    activeLinkClassName = {`${styles.activeLinkClassName}`}
                />
            </div>
        
        </div>
    );
}
export default MoviesPagination;