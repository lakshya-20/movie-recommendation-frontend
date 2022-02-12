import React, { useState, useEffect, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './Loading'
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import MoviesFilter from './MoviesFilter';

const fetchMovies = (searchParam, pagination) => {
    return fetch(`${process.env.REACT_APP_BACKENDURL}/api/movies/search?from=${pagination.from}&size=${pagination.size}`,{
        method:'POST',
        body:JSON.stringify(searchParam),
        headers:{
            'Content-Type': 'application/json',
            "Authorization":localStorage.getItem("jwt")
        }
    })
    .then(response => response.json())
    .then(response => response)
}

const Movies = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParam, setSearchParam] = useState({
        title: {
            type: 'text',
            present: false,
            value: null
        },
        genres: {
            type: 'checkbox',
            present: false,
            values: []
        },
        imdb_score: {
            type: "range",
            present: false,
            value: {
                min: null,
                max: null
            }
        }
    });
    const [pagination, setPagination] = useState({
        from: 0,
        size: 12,
    })    
    useEffect(() => {
        setLoading(true);
        fetchMovies(searchParam, pagination).then(response => {
            setResponse(response);
            setLoading(false);
        })
    }, [searchParam, pagination]);

    const updateSearchParam = useCallback(( name, value, checked = false ) => {
        if (searchParam[name].type === 'text') {
            setSearchParam({
                ...searchParam,
                [name]: {
                    ...searchParam[name],
                    present: true,
                    value: value
                }
            })
        } else if (searchParam[name].type === 'checkbox') {
            if (checked) {
                setSearchParam({
                    ...searchParam,
                    [name]: {
                        ...searchParam[name],
                        present: true,
                        values: [...searchParam[name].values, value]
                    }
                })
            } else {
                setSearchParam({
                    ...searchParam,
                    [name]: {
                        ...searchParam[name],
                        present: true,
                        values: searchParam[name].values.filter(v => v !== value)
                    }
                })
            }
        } else if (searchParam[name].type === 'range') {
            setSearchParam({
                ...searchParam,
                [name]: {
                    ...searchParam[name],
                    present: true,
                    value: {
                        min: value.min,
                        max: value.max
                    }
                }
            })
        }
    }, [searchParam])
    const updatePagination = useCallback((from) => {
        setPagination({...pagination, from: from})
    }, [pagination])
    return (
        <div className="container">
            <div className="row">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb cust_breadcrumb">
                        <li class="breadcrumb-item "><Link to='/' className="cust_breadcrumb_link">Home</Link></li>
                        <li class="breadcrumb-item text-light active" aria-current="page">Movies</li>
                    </ol>
                </nav>
                <div className="col-12 d-flex flex-wrap">
                    <h3 className="main_heading col-12 col-sm-12 col-md-4 float-left">Movies</h3>                    
                    <div className="col-sm-12 col-md-8 float-right">
                        {response.filter_params?
                            <MoviesFilter updateSearchParam={updateSearchParam} filter_params={response.filter_params}/>                        
                        :null}                        
                    </div>
                </div> 
            </div>            
            {loading?
                <Loading />
            :
                <div className='row'>
                    {response.movies && response.movies.map(movie => {
                        return <div className="col-6 col-md-3  py-3"  key={movie.id}>                    
                            <MovieCard movie={movie}/>
                        </div>
                    })}
                </div>
            }
            <Pagination pagination={pagination} updatePagination={updatePagination} total={response.total} />
        </div>        
    );
    
}

export default memo(Movies);