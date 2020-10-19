import React, {Component,useState,useEffect,useContext} from 'react'
import { Modal,ModalHeader, ModalBody,Form, 
    FormGroup, Input,Label, 
    Breadcrumb, BreadcrumbItem,Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import BeautyStars from 'beauty-stars';
import {usercontext} from'../../App'
import {useParams,Link} from 'react-router-dom'
import {backendURL,flaskBackendURL} from '../../Config'

const MovieDetails=({props})=>{

    const [movieId,setMovieId]=useState(useParams().movieId)
    const [movieDetails,setMovieDetails]=useState({})
    const [reviewDetails,setReviewDetails]=useState({})
    const [isReviewd,setIsReviewed]=useState(false)
    const [isReviewModalOpen,setIsReviewModalOpen]=useState(false)
    const [newReview,setNewReview]=useState({})
    const {state,dispatch}=useContext(usercontext)
    
    useEffect(()=>{
        fetch(backendURL+`/api/movies/${movieId}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMovieDetails(result)
        })
    },[])

    useEffect(()=>{
        
        if(state){
            const reviews=state.reviews
            for(var i=0;i<reviews.length;i++){
                const review=reviews[i]
                if(review.refMovieId._id===movieId){
                    setReviewDetails(review)
                    setIsReviewed(true)

                    break;
                }
            }
        }
    },[movieDetails])

    const toggleReviewModal=()=>{
        setIsReviewModalOpen(!isReviewModalOpen)
    }

    const onChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setNewReview({...newReview,[name]:value})
    };
    
    const flaskHandleSubmit=()=>{
        const userId=state._id
        fetch(flaskBackendURL+`/newReview/${userId}`,{
            
        }).then(res=>{
            console.log("review added")
        }).catch(err=>{
            console.log(err)
        })

    }

    const handleSubmit=(event)=> {
        const rating=newReview.rating
        const comment=newReview.comment
        const mid=movieDetails.movieId
        const refMovieId=movieDetails._id
        const userId=state._id
        fetch(backendURL+"/api/reviews",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                rating,
                comment,
                movieId:mid,
                refMovieId,
                userId
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                alert(JSON.stringify(data.error))
            }
            else{        
                //console.log(data)
                setIsReviewed(true)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                toggleReviewModal()
                flaskHandleSubmit()
                window.location.reload(false);
            }
        }).catch(err=>{
            console.log(err)
        })
        
        event.preventDefault();
    }



    return(
        <div className="container">
            <Modal isOpen={isReviewModalOpen} toggle={toggleReviewModal}>
                <ModalHeader toggle={toggleReviewModal}>Review</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Input type="text" id="rating" name="rating" onChange={onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Input type="text" id="comment" name="comment" onChange={onChange}/>
                        </FormGroup>
                        <div className="d-flex justify-content-around">
                            <Button type="submit" value="submit" color="primary" >Sumbit</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/movies'>Movies</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{movieDetails.title}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Movie</h3>
                    <hr />
                </div> 
            </div>
            <div className="row py-3">
                <div className=" col-12  col-sm-3">
                    <img src={movieDetails.poster} className="col-12"></img>
                </div>
                <div className="col-10  col-sm-6 ml-3">
                    <h2 className="font-weight-bold">{movieDetails.title}</h2>
                    <span className="text-secondary ">{movieDetails.genres}</span>
                    {/* <StarRatings
                        rating={movieDetails.imdb_score}
                        starRatedColor="blue"
                        numberOfStars={10}
                        name='rating'
                    /> */}
                    <hr/>
                    <BeautyStars
                        value={movieDetails.imdb_score}
                        maxStars={10}
                        size={"15px"}
                        activeColor={"black"}
                        inactiveColor={"grey"}
                        //onChange={value => this.setState({ value })}
                    />
                    <>
                        {
                            state?
                                <div>
                                    <>
                                    <br/>
                                        {
                                            isReviewd?
                                                <div>
                                                    
                                                    <h4>Your Review</h4>
                                                    <BeautyStars
                                                        value={reviewDetails.rating}
                                                        maxStars={10}
                                                        size={"15px"}
                                                        activeColor={"black"}
                                                        inactiveColor={"grey"}
                                                    />
                                                </div>
                                            :
                                                <div className="row justify-content-center">
                                                    <Button outline onClick={toggleReviewModal}>Rate this movie</Button>
                                                </div>
                                        }
                                    </>
                                </div>
                            :
                                <div>

                                </div>
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;