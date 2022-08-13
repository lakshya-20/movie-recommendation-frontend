import React, {useContext,useState} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, 
    Collapse, NavItem,Button, Modal, Dropdown, 
    DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, useHistory} from 'react-router-dom';
import {usercontext} from'../App';
import {toast} from 'react-toastify';

//redux
import {fetchUserReviews,fetchMovies,fetchRecommendations,addAuthState,authStateLogout}  from '../redux/ActionCreators';
import {connect} from 'react-redux';
import Authentication from './screens/Authentication/index';


const mapStateToProps=state=>{
    return{
        authState:state.authState
    }
}

const mapDispatchToProps=dispatch=>({
    fetchUserReviews:(userId)=>dispatch(fetchUserReviews(userId)),
    fetchMovies:()=>dispatch(fetchMovies()),
    fetchRecommendations:(userId)=>dispatch(fetchRecommendations(userId)),
    addAuthState:(authState)=>dispatch(addAuthState(authState)),
    authStateLogout:()=>dispatch(authStateLogout())
})

const Header =(props)=>{
    const [isNavOpen,setIsNavOpen]=useState(false);
    const [isAuthModalOpen,setIsAuthModalOpen]=useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {state,dispatch}=useContext(usercontext)
    const history=useHistory()

    const toggleNav=()=> {
        setIsNavOpen(!isNavOpen)
    }
    const toggleAuthModal=()=>{
        setIsAuthModalOpen(!isAuthModalOpen)
    }
    const handleGoogleLogin=()=>{
        window.open(process.env.REACT_APP_BACKENDURL+"/api/auth/google", "_self");
    }
    const handleLogout=(e)=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        window.location.reload(false);
        props.authStateLogout();
        toast.success("Logout Success");
        history.push('/')
    }
    const toggleDropdown=()=>{
        setDropdownOpen(!dropdownOpen)
    }
    const dropdown=()=>{
        return(
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    <>
                    {localStorage.getItem("user")?
                        JSON.parse(localStorage.getItem("user")).name
                        :"USER"
                    }
                    </>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        Profile
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }

    return(
        <div className="pb-3">
            <Modal isOpen={isAuthModalOpen} toggle={toggleAuthModal} className="modal-dialog-centered">
                <Authentication toggleAuthModal={toggleAuthModal}/>
            </Modal>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href={state?"/#":"/#"}>
                        <img src='logo.png'/> <span style={{fontFamily: "Lucida Console"}}> Flick</span>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNav} className="navbar-wrapper">
                        {isNavOpen?
                            <i className="fa fa-times"></i>
                        :
                            <i className="fa fa-bars"></i>
                        }
                    </NavbarToggler>
                        
                    {state ?
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus' onClick={toggleNav}><span className="fa fa-info fa-lg"></span> About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/movies' onClick={toggleNav}><span className="fa fa-film fa-lg"></span> Movies</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus' onClick={toggleNav}><span className="fa fa-address-card fa-lg"></span> Contact</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline> {dropdown()}</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    : 
                        <Collapse isOpen={isNavOpen} navbar onClick={toggleNav}>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus' onClick={toggleNav}><span className="fa fa-info fa-lg"></span> About</NavLink>
                                </NavItem> 
                                <NavItem>
                                    <NavLink className="nav-link"  to='/movies' onClick={toggleNav}><span className="fa fa-film fa-lg"></span> Movies</NavLink>
                                </NavItem>                                       
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus' onClick={toggleNav}><span className="fa fa-address-card fa-lg"></span> Contact</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={()=>toggleAuthModal()} ><span className="fa fa-user fa-lg"></span> Login</Button>
                                </NavItem>
                            </Nav>  
                        </Collapse> 
                    }
                </div>
            </Navbar>
        </div>
    )

}

export default connect(mapStateToProps,mapDispatchToProps)(Header);