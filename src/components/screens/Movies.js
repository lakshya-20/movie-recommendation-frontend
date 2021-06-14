import React, { useState,useEffect,useContext } from 'react';
import MoviesPagination from './MoviesPagination'
import { Loading } from './Loading'
import {fetchMovies,moviesLoading}  from '../../redux/ActionCreators';
import {connect} from 'react-redux';
import {usercontext} from'../../App'

const mapStateToProps=state=>{
    return{
        movies:state.movies
    }
}
const mapDispatchToProps=dispatch=>({
    fetchMovies:()=>dispatch(fetchMovies()),
    moviesLoading:()=>dispatch(moviesLoading())
})
const Movies = (props) => {
    const[movies_data,setMoviesData]=useState([])
    const {state}=useContext(usercontext)
    useEffect(()=>{
        if(props.movies.MOVIES==0){
            props.fetchMovies();
        }
    },[state])


    useEffect(()=>{
        if(!props.movies.loading){
            setMoviesData(props.movies.MOVIES)
        }
    },[props])
    return (
        <div className="container">
            {
                movies_data.length>10?
                    <MoviesPagination movies_data={movies_data}/>
                :
                    <div className="container">
                        <div className="row text-center pt-5">            
                            <Loading />
                        </div>
                    </div>
            }    
        </div>
    );
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Movies);