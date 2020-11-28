import * as ActionTypes from '../ActionTypes';

export const Recommendations=(state={
    isLoading:true,
    errMess:null,
    recommendations:[]
},action)=>{
    switch(action.type){
        case ActionTypes.RECOMMENDATIONS_LOADING:
            return{...state,isLoading:true,recommendations:[],errMess:null}
        case ActionTypes.RECOMMENDATIONS_FAILED:
            return{...state,isLoading:false,recommendations:[],errMess:action.payload}
        case ActionTypes.ADD_RECOMMENDATIONS:
            return{...state,isLoading:false,recommendations:action.payload,errMess:null}
        default:return state;
    }
}