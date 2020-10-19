import React, {useContext,useState,useEffect} from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, 
    Collapse, NavItem, Jumbotron,Button, Modal, 
    ModalHeader, ModalBody,Form, FormGroup, Input, 
    Toast,ToastHeader,Label,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, useHistory} from 'react-router-dom';
import {usercontext} from'../App'
import M from 'materialize-css'
import {backendURL} from '../Config'
const Header =()=>{
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
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
            //signal("invalid email","danger")
            
        }
        if(password!==repassword){
            M.toast({html:"password does match",classes:"#c62828 red darken-3",displayLength:1500})
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
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{        
                //console.log(data)
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                //M.toast({html:data.message,classes:"#43a047 green darken-1"})
                //signal()
                toggleSignupModal();
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        
        event.preventDefault();
    }

    const handleLogin=(event)=>{
        const email=user.email;
        const password=user.password;
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
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
                alert(data.error);
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                //M.toast({html:"signedin successfully",classes:"#43a047 green darken-1"})
                toggleLoginModal();
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        
        event.preventDefault();
    }

    const handleLogout=(e)=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
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
                    jhkj
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
        <div>
            {/* {console.log(state)} */}
            <Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
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
                        </div>
                        
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={isSignupModalOpen} toggle={toggleSignupModal}>
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
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
            <Navbar dark expand="md">
                <div className="container">
                    {()=>signal()}
                    <NavbarToggler onClick={toggleNav} />
                    <NavbarBrand className="mr-auto" href={state?"/":"/"}><img src='assets/images/logo.png' height="30" width="41" alt='Flick' /></NavbarBrand>
                    
                        <>
                        {
                            state ?
                                <Collapse isOpen={isNavOpen} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link"  to='/movies'><span className="fa fa-list fa-lg"></span> Movies</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button outline> {dropdown()}</Button>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            : 
                                <Collapse isOpen={isNavOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button outline onClick={()=>toggleLoginModal()}><span className="fa fa-sign-in fa-lg"></span> User</Button>
                                        </NavItem>
                                    </Nav>  
                                </Collapse> 
                        }
                        </>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Flick</h1>
                            <p>Flick is a Content-based recommendation system to provide you an enriching experience for the movie bucket list.</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </div>

    )

}

export default Header