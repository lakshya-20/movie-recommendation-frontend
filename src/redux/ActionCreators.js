import * as ActionTypes from './ActionTypes';
import {backendURL} from '../Config';


//Movies Handling
export const moviesLoading=()=>({
    type:ActionTypes.MOVIES_LOADING
})

export const moviesFailed=()=>({
    type:ActionTypes.MOVIES_FAILED
})

export const addMovies=(movies)=>({
    type:ActionTypes.ADD_MOVIES,
    payload:movies
})

//Rating Handling
export const userRatingLoading=()=>({
    type:ActionTypes.USER_RATING_LOADING
})

export const userRatingFailed=()=>({
    type:ActionTypes.USER_RATING_FAILED
})

export const addUserRating=(userRating)=>({
    type:ActionTypes.ADD_USER_RATING,
    payload:userRating
})


//Recommendations Handling
export const recommendationLoading=()=>({
    type:ActionTypes.RECOMMENDATIONS_LOADING
})

export const moviesFailed=()=>({
    type:ActionTypes.RECOMMENDATIONS_FAILED
})

export const addMovies=(recommendations)=>({
    type:ActionTypes.ADD_RECOMMENDATIONS,
    payload:recommendations
})


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
    type:ActionTypes.authStateLogout
})