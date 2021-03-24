import {createStore, combineReducers, applyMiddleware} from 'redux';

import {Movies} from './reducers/movies';
import {Recommendations} from './reducers/recommendations';
import {UserReviews} from './reducers/user_reviews';
import {AuthState} from './reducers/auth_state';

import thunk from 'redux-thunk'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            movies:Movies,
            recommendations:Recommendations,
            userReviews:UserReviews,
            authState:AuthState
        }),
        applyMiddleware(thunk)
    );

    return store;
}