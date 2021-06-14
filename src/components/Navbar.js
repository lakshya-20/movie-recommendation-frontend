import React, {useContext,useState} from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, 
    Collapse, NavItem,Button, Modal, 
    ModalHeader, ModalBody,Form, FormGroup, Input, 
    Toast,ToastHeader,Label,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, useHistory} from 'react-router-dom';
import {usercontext} from'../App'
import {backendURL} from '../Config'
import {toast} from 'react-toastify';

//redux
import {fetchUserReviews,fetchMovies,fetchRecommendations,addAuthState,authStateLogout}  from '../redux/ActionCreators';
import {connect} from 'react-redux';


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
    const [isLoginModalOpen,setIsLoginModalOpen]=useState(false);
    const [isSignupModalOpen,setIsSignupModalOpen]=useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {state,dispatch}=useContext(usercontext)
    const history=useHistory()
    const [user,setUser]=useState({
        name:"User",
        username:" ",
        email:" ",
        password:" ",
        repassword:" ",
        gender:" ",
        photo:" "
    })

    const toggleNav=()=> {
        setIsNavOpen(!isNavOpen)
    }

    const toggleLoginModal=()=>{
        setIsLoginModalOpen(!isLoginModalOpen)
        setIsSignupModalOpen(false)
    }

    const toggleSignupModal=()=> {
        setIsSignupModalOpen(!isSignupModalOpen)
        setIsLoginModalOpen(false)
    }

    const handleSignup=(event)=> {
        
        //alert(JSON.stringify(user))
        const email=user.email;
        const password=user.password;
        const repassword=user.repassword;
        const name=user.name;
        const gender=user.gender
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email");
            return
            //signal("invalid email","danger")
            
        }
        if(password!==repassword){
            toast.error("Password does not match");            
            return
        }
        fetch(backendURL+"/api/auth/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.error(data.error.message);
            }
            else{        
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                //M.toast({html:data.message,classes:"#43a047 green darken-1"})
                //signal()
                toggleSignupModal();
                //props.addAuthState(data)
                toast.success("Signup Success");
                history.push('/')
            }
        }).catch(err=>{
            toast.error("Some error occured");
        })
        
        event.preventDefault();
    }

    const handleLogin=(event)=>{
        const email=user.email;
        const password=user.password;
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email");
            return
        }
        fetch(backendURL+"/api/auth/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){                
                toast.error(data.error.message);
            }
            else{                
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                toggleLoginModal();
                toast.success("Login Success");
                history.push('/')
            }
        }).catch(err=>{
            toast.error("Some error occured");
        })
        
        event.preventDefault();
    }

    const handleGoogleLogin=()=>{
        window.open(backendURL+"/api/auth/google", "_self");
    }

    const handleLogout=(e)=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        window.location.reload(false);
        props.authStateLogout();
        toast.success("Logout Success");
        history.push('/')
    }
    const onChange=(e)=>{
        //signal()
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value})
    };

    const signal=()=>{
        return(
            <Toast isOpen={true}  id="toast-container" >
                <ToastHeader icon="success">
                </ToastHeader>
            </Toast>
        )
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
                    {/* {JSON.parse(localStorage.getItem("user")).name} */}
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
            {/* {console.log(state)} */}
            <Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email" onChange={onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" onChange={onChange}/>
                        </FormGroup>
                        <div className="d-flex justify-content-around">
                            <Button type="submit" value="submit" color="primary" >Sumbit</Button>
                            <Button color="primary" onClick={()=>toggleLoginModal,toggleSignupModal}>SignUp</Button>
                            <Button color="primary" onClick={()=>handleGoogleLogin()}>Google</Button>
                        </div>
                        
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={isSignupModalOpen} toggle={toggleSignupModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleSignupModal}>SignUp</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSignup}>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" name="name"
                                onChange={onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email"
                                onChange={onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                onChange={onChange}  />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="repassword">Re-enter Password</Label>
                            <Input type="password" id="repassword" name="repassword"
                                onChange={onChange}  />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <Label htmlFor="gender">Gender</Label>
                            <div className="d-flex justify-content-around">
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" value="male" onChange={onChange} />
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" value="female" onChange={onChange}/>
                                    Female
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" value="other" onChange={onChange}/>
                                    Other
                                </Label>
                            </FormGroup>
                            </div>
                        </FormGroup>
                        <div className="d-flex justify-content-around">
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                            <Button color="primary" onClick={()=>toggleSignupModal,toggleLoginModal}>Login</Button>
                            <Button color="primary" onClick={()=>handleGoogleLogin()}>Google</Button>    
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
            <Navbar dark expand="md">
                <div className="container">
                    {/* {()=>signal()}*/}
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
                        <>
                        {
                            state ?
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
                                            <Button outline onClick={()=>toggleLoginModal()} ><span className="fa fa-user fa-lg"></span> Login</Button>
                                        </NavItem>
                                    </Nav>  
                                </Collapse> 
                        }
                        </>
                </div>
            </Navbar>
            {/* <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-12">
                            <h1>Flick</h1>
                            <p>Flick Movie Recommendation is a content-based recommendation system that will provide you with movie recommendations based on your past interaction with the system.</p>
                        </div>
                    </div>
                </div>
            </Jumbotron> */}
        </div>

    )

}

export default connect(mapStateToProps,mapDispatchToProps)(Header);