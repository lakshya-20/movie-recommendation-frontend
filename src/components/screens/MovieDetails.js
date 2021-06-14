import React, {useState,useEffect,useContext} from 'react'
import { Modal,ModalHeader, ModalBody,Form, 
    FormGroup, Input,Label,Button } from 'reactstrap';
import BeautyStars from 'beauty-stars';
import {usercontext} from'../../App'
import {useParams,Link} from 'react-router-dom'
import {backendURL,flaskBackendURL} from '../../Config'
import {toast} from 'react-toastify';
import styles from './Styles/MovieDetails.module.css'
//redux
import {fetchUserReviews,addNewReview}  from '../../redux/ActionCreators';
import {connect} from 'react-redux';

const mapStateToProps=state=>{
    return{
        userReviews:state.userReviews
    }
}

const mapDispatchToProps=dispatch=>({
    fetchUserReviews:(userId)=>dispatch(fetchUserReviews(userId))
})


const MovieDetails=(props)=>{
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
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMovieDetails(result)
        })
    },[])
    useEffect(()=>{
        if(state){
            props.fetchUserReviews(state._id);               
        }
    },[state])
    useEffect(()=>{
        
        if(state){            
            const reviews=props.userReviews.REVIEWS
            //const reviews=state.reviews
            for(var i=0;i<reviews.length;i++){
                const review=reviews[i]
                if(review.refMovieId._id===movieId){
                    setReviewDetails(review)
                    setIsReviewed(true)
                    break;
                }
            }
        }
    },[props])

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
        const res=fetch(flaskBackendURL+`/newReview/${userId}`);
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
                "Authorization":localStorage.getItem("jwt")
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
                toast.success("Review Added"); 
                addNewReview(data.newReview)
                setIsReviewed(true)
                var stateUser=state
                stateUser.reviews.push(data.newReview);
                localStorage.setItem("user",JSON.stringify(stateUser))
                //dispatch({type:"USER",payload:stateUser})
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
            <Modal isOpen={isReviewModalOpen} toggle={toggleReviewModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleReviewModal}>Review</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            {/* <Input type="text" id="rating" name="rating" onChange={onChange} /> */}
                            <BeautyStars
                                value={newReview.rating}
                                maxStars={10}
                                size={"15px"}
                                activeColor={"black"}
                                inactiveColor={"grey"}
                                onChange={value => setNewReview({...newReview,rating:value})}
                            />
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
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb cust_breadcrumb">
                        <li class="breadcrumb-item "><Link to='/' className="cust_breadcrumb_link">Home</Link></li>
                        <li class="breadcrumb-item "><Link to='/movies' className="cust_breadcrumb_link">Movies</Link></li>
                        <li class="breadcrumb-item text-light active" aria-current="page">{movieDetails.title}</li>
                    </ol>
                </nav>
                <div className="col-12">
                    <h3 className="main_heading">Movie</h3>
                    <hr />
                </div> 
            </div>
            <div className="row py-3">
                <div className=" col-6 col-sm-3">
                    <img src={movieDetails.poster} className="col-12"></img>
                </div>
                <div className="col-10  col-sm-6 ml-3">
                    <h2 className={`${styles.movie_title}`}>{movieDetails.title}</h2>
                    <span className={`${styles.movie_genres}`}>{movieDetails.genres}</span>
                    <hr/>
                    <BeautyStars
                        value={movieDetails.imdb_score}
                        maxStars={10}
                        size={"15px"}
                        activeColor={"white"}
                        inactiveColor={"#4d4d4d"}
                        //onChange={value => this.setState({ value })}
                    />
                    <>
                    {state?
                        <div>
                            <>
                            <br/>
                                {isReviewd?
                                    <div>
                                        <h4 className={`${styles.your_review}`}>Your Review</h4>
                                        <BeautyStars
                                            value={reviewDetails.rating}
                                            maxStars={10}
                                            size={"15px"}
                                            activeColor={"white"}
                                            inactiveColor={"#4d4d4d"}
                                        />
                                    </div>
                                :
                                    <div className="row justify-content-center">
                                        <Button className={`${styles.rate_btn}`} onClick={toggleReviewModal}>Rate this movie</Button>
                                    </div>
                                }
                            </>
                        </div>
                    :
                        null
                    }
                    </>
                </div>


            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);