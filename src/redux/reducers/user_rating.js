import * as ActionTypes from '../ActionTypes';

export const UserRating=(state={
    isLoading:true,
    errMess:null,
    rating:[]
},action)=>{
    switch(action.type){
        case ActionTypes.USER_RATING_LOADING:
            return{...state,isLoading:true,rating:[],errMess:null}
        case ActionTypes.USER_RATING_FAILED:
            return{...state,isLoading:false,rating:[],errMess:action.payload}
        case ActionTypes.ADD_USER_RATING:
            return{...state,isLoading:false,rating:action.payload,errMess:null}
        default:return state;
    }
}