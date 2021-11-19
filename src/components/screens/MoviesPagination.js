import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Styles/Pagination.css'
import MovieCard from './MovieCard';
import styles from './Styles/MoviePagination.module.css';
import {backendURL,flaskBackendURL} from '../../Config';
function MoviesPagination(props) {
    const[movies_data,setMoviesData]=useState(props.movies_data)
    const [pagination, setPagination] = useState({
        data: props.movies_data,
        offset: 0,
        numberPerPage: 32,
        pageCount: 0,
        currentData: []
    });
    const [searchTitle, setSearchTitle] = useState("");
    const [searchMovieData, setSearchMovieData] = useState([]);
    
    //Debouncing
    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), timeout);
        }
    }
    function fetchData(title){
        setSearchTitle(title)
        if(title=="") {
            setSearchTitle(undefined);
            return;
        }
        fetch(backendURL+`/api/movies/find/${title}`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setSearchMovieData(result)            
        })
    }
    const processChange = debounce(fetchData,1000);

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

    const renderAllMovies = () => {
        return (
            pagination.currentData && pagination.currentData.map(((item, index) => (
                <div className="col-6 col-md-3  py-3"  key={item._id}>
                    {/* <RenderMovie movie={item}  /> */}
                    <MovieCard movie={item}/>
                </div>
            )))
        )
    }
    const renderSearchMovies = () => {
        return (
            searchMovieData.map(((item, index) => (
                <div className="col-6 col-md-3  py-3"  key={item._id}>
                    {/* <RenderMovie movie={item}  /> */}
                    <MovieCard movie={item}/>
                </div>
            )))
        )
    }
    const renderPaginationControls = () => {
        return (
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
        )
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
                    <h3 className="main_heading col-12 col-sm-6 float-left">Movies</h3>
                    {/* Search Movie */}
                    <div className="search col-12 col-sm-6 float-right">
                        <div className="d-flex justify-content-center">
                            <input 
                                type="text" 
                                className="searchTerm" 
                                placeholder="Search By Title"
                                onChange={(e)=>processChange(e.target.value)}
                            />
                            <button type="submit" className="searchButton" onClick="">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>                
                    </div>
                    {/* Search Movie Ends */}                    
                </div> 
            </div>
            <div className="row justify-content-center">
                {searchTitle?    
                    <>                                           
                    {searchMovieData.length>0?
                        <>
                        <h5 className="col-12 d-flex justify-content-center">
                            Showing Results for "{searchTitle}"
                        </h5>                        
                        {renderSearchMovies()}
                        </>
                    :
                        <>                        
                        <h5 className="col-12 d-flex justify-content-center">
                            No movie found with title "{searchTitle}""
                        </h5>
                        {renderAllMovies()}    
                        {renderPaginationControls()}                                            
                        </>
                    }
                    </>
                :
                    <>
                    {renderAllMovies()}
                    {renderPaginationControls()}
                    </>
                }
            </div>
        </div>
    );
}
export default MoviesPagination;