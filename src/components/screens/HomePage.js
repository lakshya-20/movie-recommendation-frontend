import React,{useState,useContext,useEffect} from 'react';
import {usercontext} from'../../App'
import {backendURL,flaskBackendURL} from '../../Config'
import { Card, CardImg, CardImgOverlay,CardTitle,CardBody,CardText, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {Link} from 'react-router-dom';
import { Loading } from './Loading'

//redux
import {fetchUserReviews,fetchMovies,fetchRecommendations}  from '../../redux/ActionCreators';
import {connect} from 'react-redux';


const mapStateToProps=state=>{
    return{
        userReviews:state.userReviews,
        recommendations:state.recommendations
    }
}

const mapDispatchToProps=dispatch=>({
    fetchUserReviews:(userId)=>dispatch(fetchUserReviews(userId)),
    fetchMovies:()=>dispatch(fetchMovies()),
    fetchRecommendations:(userId)=>dispatch(fetchRecommendations(userId))
})

function RenderMovie ({movie}) {
    return (
        <Card>
            <Link to={`/movie/${movie._id}`} className="text-decoration-none">
                <CardImg width="100%" src={movie.poster} alt={movie.title} />
                {/* <CardImgOverlay>
                    <CardTitle><span className="badge-dark">{movie.title}</span></CardTitle>
                </CardImgOverlay> */}
                <CardBody className="text-dark">
                    <CardTitle className="font-weight-bold">{movie.title}</CardTitle>
                    {/* <CardText>
                        {movie.genres}
                    </CardText> */}
                    
                </CardBody>
            </Link>
        </Card>
    );
}

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
};

const Homepage=(props)=>{
    console.log("homepage props"+JSON.stringify(props.recommendations))
    const[recomd_movies_data,setRecomdMoviesData]=useState([])
    const {state,dispatch}=useContext(usercontext)
    useEffect(()=>{
        if(state&& state.reviews.length!=0){
            const userId=state._id
            fetch(flaskBackendURL+`/recommendation/${userId}`)
            .then(res=>res.json())
            .then(result=>{
                const movies=result
                for(var i=0;i<movies.length;i++){
                    const movie=movies[i]
                    const id=movie._id.$oid
                    movies[i]._id=id
                }
                //setRecomdMoviesData(movies)  
            }).catch(err=>{
                console.log("err",err)
            })
        }
    },[state])

    useEffect(()=>{
        if(state&& state.reviews.length!=0){
            //alert("khg")
            props.fetchUserReviews(state._id);
            props.fetchMovies()
            props.fetchRecommendations(state._id)
        }
    },[state])

    useEffect(()=>{
        setRecomdMoviesData(props.recommendations.RECOMMENDATIONS)
    },[props])

    return(
        <div className="container">
            <div className="row">
            <Breadcrumb>
                <BreadcrumbItem active>Home</BreadcrumbItem>
            </Breadcrumb>
                <h3 className="text-center col-12">Recommendations for you</h3>
                <hr />
            </div> 
            <>
                {
                    recomd_movies_data.length!=0?
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <Carousel responsive={responsive}>
                                    {
                                        recomd_movies_data.map((movie) => {
                                            return (
                                                <div className="col-12 border"  key={movie._id}>
                                                    <RenderMovie movie={movie}  />
                                                </div>
                                            );
                                        })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    :
                        <div className="container">
                            <div className="row text-center pt-5">            
                                <Loading />
                            </div>
                        </div>
                }
                </>
        </div>

    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);