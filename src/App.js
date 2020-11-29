import React,{useEffect,createContext, useReducer, useContext} from 'react';

import {BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom'
import NavBar from './components/Navbar'
import HomePage from './components/screens/HomePage';
import Login from './components/screens/Login';
import Movies from './components/screens/Movies';
import MovieDetails from './components/screens/MovieDetails'
import Contact from './components/screens/Contact'
import About from './components/screens/About'
import './App.css';
import {reducer,initialState} from './reducers/userReducer'


//redux
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/ConfigureStore';
const store=ConfigureStore();

export const usercontext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(usercontext)
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/movie/:movieId">
        <MovieDetails/>
      </Route>
      <Route path='/contactus'>
        <Contact/>
      </Route>
      <Route path="/aboutus">
        <About />
      </Route>
    </Switch>
  );
}
function App() {
  //localStorage.clear()
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <usercontext.Provider value={{state,dispatch}}>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
      </Provider>
    </usercontext.Provider>
    
  );
}

export default App;