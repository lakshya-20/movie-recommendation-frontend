import * as ActionTypes from '../ActionTypes';

export const Recommendations=(state={
    isLoading:true,
    errMess:null,
    RECOMMENDATIONS:[]
},action)=>{
    switch(action.type){
        case ActionTypes.RECOMMENDATIONS_LOADING:
            return{...state,isLoading:true,RECOMMENDATIONS:[],errMess:null}
        case ActionTypes.RECOMMENDATIONS_FAILED:
            return{...state,isLoading:false,RECOMMENDATIONS:[],errMess:action.payload}
        case ActionTypes.ADD_RECOMMENDATIONS:
            return{...state,isLoading:false,RECOMMENDATIONS:action.payload,errMess:null}
        default:return state;
    }
}