import React, { useState,useEffect } from 'react';
import { Card, CardImg, CardImgOverlay,CardTitle,CardBody,CardText, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {backendURL} from '../../Config'
import App from './MoviesPagination'
import { Loading } from './Loading'
    const movies_data=[
        // {
        //     _id: "5f8b5e1ae2ee0b535ab9a6e8",
        //     movieId: 114709,
        //     imdb_link: "http://www.imdb.com/title/tt114709",
        //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        //     title: "Toy Story (1995)",
        //     imdb_score: 8.3,
        //     genres: "Animation|Adventure|Comedy"
        // },
        // {
        //     _id: "5f8b5e1ae2ee0b535ab9a6e8",
        //     movieId: 114709,
        //     imdb_link: "http://www.imdb.com/title/tt114709",
        //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        //     title: "Toy Story (1995)",
        //     imdb_score: 8.3,
        //     genres: "Animation|Adventure|Comedy"
        // },
        // {
        //     _id: "5f8b5e1ae2ee0b535ab9a6e8",
        //     movieId: 114709,
        //     imdb_link: "http://www.imdb.com/title/tt114709",
        //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        //     title: "Toy Story (1995)",
        //     imdb_score: 8.3,
        //     genres: "Animation|Adventure|Comedy"
        // },
        // {
        //     _id: "5f8b5e1ae2ee0b535ab9a6e8",
        //     movieId: 114709,
        //     imdb_link: "http://www.imdb.com/title/tt114709",
        //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        //     title: "Toy Story (1995)",
        //     imdb_score: 8.3,
        //     genres: "Animation|Adventure|Comedy"
        // },
        // {
        //     _id: "5f8b5e1ae2ee0b535ab9a6e8",
        //     movieId: 114709,
        //     imdb_link: "http://www.imdb.com/title/tt114709",
        //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        //     title: "Toy Story (1995)",
        //     imdb_score: 8.3,
        //     genres: "Animation|Adventure|Comedy"
        // },
        // {
        //     _id: "5f8b5e1ae2ee0b535ab9a6e8",
        //     movieId: 114709,
        //     imdb_link: "http://www.imdb.com/title/tt114709",
        //     poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        //     title: "Toy Story (1995)",
        //     imdb_score: 8.3,
        //     genres: "Animation|Adventure|Comedy"
        // }
    ]



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

    const Movies = (props) => {

        const[movies_data,setMoviesData]=useState([])

        useEffect(()=>{
            fetch(backendURL+'/api/movies',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                setMoviesData(result)
                //console.log("lkjlk",result.posts)
            })
        },[])

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
                    movies_data.length>100?
                        <App movies_data={movies_data}/>
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

export default Movies;