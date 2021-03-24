import * as ActionTypes from '../ActionTypes';

export const Movies=(state={
    isLoading:true,
    errMess:null,
    MOVIES:[]
},action)=>{
    switch(action.type){
        case ActionTypes.MOVIES_LOADING:
            return{...state,isLoading:true,MOVIES:[],errMess:null}
        case ActionTypes.MOVIES_FAILED:
            return{...state,isLoading:false,MOVIES:[],errMess:action.payload}
        case ActionTypes.ADD_MOVIES:
            return{...state,isLoading:false,MOVIES:action.payload,errMess:null}
        default:return state;
    }
}