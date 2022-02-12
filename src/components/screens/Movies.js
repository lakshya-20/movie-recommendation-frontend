import React, { useState, useEffect, memo, useCallback } from 'react';
import { Loading } from './Loading'
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const fetchMovies = (searchParam, pagination) => {
    return fetch(`${process.env.REACT_APP_BACKENDURL}/api/movies/search?from=${pagination.from}&size=${pagination.size}`,{
        method:'POST',
        body:JSON.stringify(searchParam),
        headers:{
            "Authorization":localStorage.getItem("jwt")
        }
    })
    .then(response => response.json())
    .then(response => response)
}

const Movies = (props) => {
    const [movies, setMovies] = useState([]);
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
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setLoading(true);
        fetchMovies(searchParam, pagination).then(response => {
            setMovies(response.movies);
            setLoading(false);
            setTotal(response.total);
        })
    }, [searchParam, pagination]);

    const updateSearchParam = useCallback(( name, value, checked) => {
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
                        min: searchParam[name].value.min,
                        max: searchParam[name].value.max
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
            {loading?
                <Loading />
            :
                <div className='row'>
                    {movies.map(movie => {
                        return <div className="col-6 col-md-3  py-3"  key={movie.id}>                    
                            <MovieCard movie={movie}/>
                        </div>
                    })}
                </div>
            }
            <Pagination pagination={pagination} updatePagination={updatePagination} total={total} />
        </div>        
    );
    
}

export default memo(Movies);