import React,{useState,useContext,useEffect} from 'react';
import {usercontext} from'../../App'
import {backendURL,flaskBackendURL} from '../../Config'
import { Card, CardImg, CardImgOverlay,CardTitle,CardBody,CardText, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './Loading'

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
                    <CardText>
                        {movie.genres}
                    </CardText>
                    
                </CardBody>
            </Link>
        </Card>
    );
}

const Homepage=()=>{
    const[recomd_movies_data,setRecomdMoviesData]=useState([])
    const {state,dispatch}=useContext(usercontext)
    useEffect(()=>{
        if(state){
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
                setRecomdMoviesData(movies)  
            }).catch(err=>{
                console.log("err",err)
            })
        }
    },[state])
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
                            {
                                recomd_movies_data.map((movie) => {
                                    return (
                                        <div className="col-5 col-md-3  py-3"  key={movie._id}>
                                            <RenderMovie movie={movie}  />
                                        </div>
                                    );
                                })
                            }
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

export default Homepage;