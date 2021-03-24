import * as ActionTypes from './ActionTypes';
import {backendURL,flaskBackendURL} from '../Config';


//Movies Handling
export const moviesLoading=()=>({
    type:ActionTypes.MOVIES_LOADING
})

export const moviesFailed=(errMess)=>({
    type:ActionTypes.MOVIES_FAILED,
    payload:errMess
})

export const addMovies=(movies)=>({
    type:ActionTypes.ADD_MOVIES,
    payload:movies
})

export const fetchMovies=()=>(dispatch)=>{
    dispatch(moviesLoading());
    return fetch(backendURL+'/api/movies',{
        headers:{
            "Authorization":localStorage.getItem("jwt")
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } 
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        //dispatch(moviesFailed(errMess));
        throw errMess;
    })
    .then(response => response.json())
    .then(movies => dispatch(addMovies(movies)))
}

//Reviews Handling
export const userReviewsLoading=()=>({
    type:ActionTypes.USER_REVIEWS_LOADING
})

export const userReviewsFailed=(errMess)=>({
    type:ActionTypes.USER_REVIEWS_FAILED,
    payload:errMess
})

export const addUserReviews=(userReviews)=>({
    type:ActionTypes.ADD_USER_REVIEWS,
    payload:userReviews
})

export const newUserReview=(userReview)=>({
    type:ActionTypes.NEW_USER_REVIEW,
    payload:userReview
})

export const fetchUserReviews=(userId)=>(dispatch)=>{
    dispatch(userReviewsLoading());
    return fetch(backendURL+`/api/reviews/${userId}`,{
        headers:{
            "Authorization":localStorage.getItem("jwt")
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } 
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        dispatch(userReviewsFailed(errMess))
        throw errMess;
    })
    .then(response => response.json())
    .then(reviews => dispatch(addUserReviews(reviews)))
}


//Recommendations Handling
export const recommendationsLoading=()=>({
    type:ActionTypes.RECOMMENDATIONS_LOADING
})

export const recommendationsFailed=()=>({
    type:ActionTypes.RECOMMENDATIONS_FAILED
})

export const addRecommendations=(recommendations)=>({
    type:ActionTypes.ADD_RECOMMENDATIONS,
    payload:recommendations
})

export const fetchRecommendations=(userId)=>(dispatch)=>{
    dispatch(recommendationsLoading());
    return fetch(flaskBackendURL+`/recommendation/${userId}`)
    // .then(response => {
    //     if (response.ok) {
    //         return response;
    //     } 
    //     else {
    //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //         error.response = response;
    //         throw error;
    //     }
    // },
    // error => {
    //     var errMess = new Error(error.message);
    //     console.log("rror"+errMess)
    //     dispatch(recommendationsFailed(errMess))
    //     throw errMess;
    // })
    .then(response => response.json())
    .then(recommd => {
        const movies=recommd
        for(var i=0;i<movies.length;i++){
            const movie=movies[i]
            const id=movie._id.$oid
            movies[i]._id=id
        }
        dispatch(addRecommendations(movies))
    })
}

//AuthState Handling
export const authStateLoading=()=>({
    type:ActionTypes.AUTH_STATE_LOADING
})

export const authStateFailed=()=>({
    type:ActionTypes.AUTH_STATE_FAILED
})

export const addAuthState=(authState)=>({
    type:ActionTypes.ADD_AUTH_STATE,
    payload:authState
})

export const authStateLogout=()=>({
    type:ActionTypes.AUTH_STATE_LOGOUT
})

export const updateAuthState=(newReview)=>({
    type:ActionTypes.UPDATE_AUTH_STATE,
    payload:newReview
})


//function to handle with new review

export const addNewReview=(newReview)=>(
    newUserReview(newReview),
    updateAuthState(newReview)
)