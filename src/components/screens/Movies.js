import React, { useState,useEffect,useContext } from 'react';
import { Card, CardImg, CardImgOverlay,CardTitle,CardBody,CardText, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {backendURL} from '../../Config'
import MoviesPagination from './MoviesPagination'
import { Loading } from './Loading'

import {fetchMovies,moviesLoading}  from '../../redux/ActionCreators';
import {connect} from 'react-redux';
import {usercontext} from'../../App'
    function RenderMovie ({movie}) {
        return (
            <Card>
                <Link to={`/menu/${movie.id}`} className="text-decoration-none">
                    <CardImg width="100%" src={movie.poster} alt={movie.title} />
                    {/* <CardImgOverlay>
                        <CardTitle><span className="badge-dark">{movie.title}</span></CardTitle>
                    </CardImgOverlay> */}
                    <CardBody className="text-dark">
                        <CardTitle className="font-weight-bold">{movie.title}</CardTitle>
                        <CardText>
                            {movie.genres}
                        </CardText>
                        
                    </CardBody>
                </Link>
            </Card>
        );
    }

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
        const {state,dispatch}=useContext(usercontext)
        
        useEffect(()=>{
            // fetch(backendURL+'/api/movies',{
            //     headers:{
            //         "Authorization":localStorage.getItem("jwt")
            //     }
            // }).then(res=>res.json())
            // .then(result=>{
            //     //setMoviesData(result)
            //     //console.log("lkjlk",result.posts)
            // })
            // //props.fetchMovies();
            // //alert(JSON.stringify(props.movies))
            // //props.moviesLoading();
        },[])


        useEffect(()=>{
            if(props.movies.MOVIES==0){
                props.fetchMovies();
            }
        },[state])


        useEffect(()=>{
            //alert(JSON.stringify(props))
            if(!props.movies.loading){
                setMoviesData(props.movies.MOVIES)
                //alert(JSON.stringify(props.movies.MOVIES))
            }
        },[props])


        const movies = movies_data.map((movie) => {
            return (
                <div className="col-5 col-md-3  py-3"  key={movie._id}>
                    <RenderMovie movie={movie}  />
                </div>
            );
        });

        
        return (
            <div className="container">
                {/* <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Movies</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Movies</h3>
                        <hr />
                    </div> 
                </div>
                <div className="row justify-content-center">
                    {movies}
                </div> */}
                <>
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
                </>
                
            </div>
        );
        
    }

export default connect(mapStateToProps,mapDispatchToProps)(Movies);