import * as ActionTypes from '../ActionTypes';

export const UserReviews=(state={
    isLoading:true,
    errMess:"kjgjh",
    REVIEWS:[]
},action)=>{
    switch(action.type){
        case ActionTypes.USER_REVIEWS_LOADING:
            return{...state,isLoading:true,REVIEWS:[],errMess:null}
        case ActionTypes.USER_REVIEWS_FAILED:
            return{...state,isLoading:false,REVIEWS:[],errMess:action.payload}
        case ActionTypes.ADD_USER_REVIEWS:
            return{...state,isLoading:false,REVIEWS:action.payload,errMess:null}
        case ActionTypes.NEW_USER_REVIEW:
            return{...state,isLoading:false,REVIEWS:state.REVIEWS.push(action.payload),errMess:null}
        default:return state;
    }
}