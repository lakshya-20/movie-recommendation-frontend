import * as ActionTypes from '../ActionTypes';

export const AuthState=(state={
    isLoading:true,
    errMess:null,
    authState:{},
    login:false
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_AUTH_STATE:
            return {...state,isLoading:false,errMess:null,authState:action.payload,login:true}
        case ActionTypes.AUTH_STATE_FAILED:
            return {...state,isLoading:false,errMess:action.payload,authState:{},login:false}
        case ActionTypes.AUTH_STATE_LOADING:
            return {...state,isLoading:true,errMess:null,authState:{},login:true}
        case ActionTypes.AUTH_STATE_LOGOUT:
            return {...state,isLoading:false,errMess:null,authState:{},login:false}
        case ActionTypes.UPDATE_AUTH_STATE:
            return {...state,isLoading:false,errMess:null,authState:state.authState.push(action.payload),login:false}
        default:return state;
    }
}