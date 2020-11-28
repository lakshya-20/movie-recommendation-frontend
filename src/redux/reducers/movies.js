import * as ActionTypes from '../ActionTypes';

export const Movies=(state={
    isLoading:true,
    errMess:null,
    movies:[]
},action)=>{
    switch(action.type){
        case ActionTypes.MOVIES_LOADING:
            return{...state,isLoading:true,movies:[],errMess:null}
        case ActionTypes.MOVIES_FAILED:
            return{...state,isLoading:false,movies:[],errMess:action.payload}
        case ActionTypes.ADD_MOVIES:
            return{...state,isLoading:false,movies:action.payload,errMess:null}
        default:return state;
    }
}