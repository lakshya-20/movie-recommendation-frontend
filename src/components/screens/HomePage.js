import React,{useState,useContext,useEffect} from 'react';
import {usercontext} from'../../App'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Loading } from './Loading'

//redux
import {fetchUserReviews,fetchMovies,fetchRecommendations}  from '../../redux/ActionCreators';
import {connect} from 'react-redux';
import MovieCard from './MovieCard';


const mapStateToProps=state=>{
    return{
        userReviews:state.userReviews,
        recommendations:state.recommendations,
        authState:state.authState
    }
}

const mapDispatchToProps=dispatch=>({
    fetchUserReviews:(userId)=>dispatch(fetchUserReviews(userId)),
    fetchMovies:()=>dispatch(fetchMovies()),
    fetchRecommendations:(userId)=>dispatch(fetchRecommendations(userId))
})

const responsive = {
    superLargeDesktop: {
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
    const[recommendations, setRecommendations] = useState([]);
    const { state, dispatch} = useContext(usercontext);

    useEffect(()=>{
        if(state&& state.reviews.length!=0){
            props.fetchUserReviews(state._id);
            props.fetchMovies()
            props.fetchRecommendations(state._id)            
        }
        else{
            props.fetchRecommendations()
        }
    },[])

    useEffect(()=>{
        if(state&& state.reviews.length!=0){
            props.fetchUserReviews(state._id);
            props.fetchMovies()
            props.fetchRecommendations(state._id)
        }
    },[state])

    useEffect(()=>{
        setRecommendations(props.recommendations.RECOMMENDATIONS)
    },[props])

    

    return(
        <div className="container">
            <div className="row">
                <h3 className="text-center col-12 main_heading">Recommendations</h3>
            </div> 
            <>
            {recommendations.length > 0?
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Carousel responsive={responsive}>
                            {
                                recommendations.map((movie) => {
                                    return (
                                        <div className="col-12"  key={movie._id}>
                                            <MovieCard movie={movie} />
                                        </div>
                                    );
                                })
                            }
                        </Carousel>
                    </div>
                </div>
            :
            ""
            }
            </>
        </div>

    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);