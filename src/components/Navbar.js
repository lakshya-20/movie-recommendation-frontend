import React, {Component} from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,Button, Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {usercontext} from'../App'
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            user:this.context
        };
        this.user={
            name:"User",
            username:" ",
            email:" ",
            password:" ",
            gender:" ",
            photo:" "
        }
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
        this.onChange=this.onChange.bind(this);
    }

      
        toggleNav() {
            this.setState({
            isNavOpen: !this.state.isNavOpen
            });
        }

        toggleLoginModal() {
            this.setState({
                isLoginModalOpen: !this.state.isLoginModalOpen,
                isSignupModalOpen: false
            });
        }

        toggleSignupModal() {
            this.setState({
                isSignupModalOpen: !this.state.isSignupModalOpen,
                isLoginModalOpen:false
            });
        }

        handleLogin(event) {
            this.toggleLoginModal();
            alert(JSON.stringify(this.user))
            event.preventDefault();
        }

        handleSignup(event) {
            this.toggleSignupModal();
            alert(JSON.stringify(this.user))
            event.preventDefault();
        }

        onChange(e){
            const name=e.target.name;
            const value=e.target.value;
            this.user[name]=value
        };
    render() {
        return(
            <div>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" onChange={this.onChange}/>
                            </FormGroup>
                            <div className="d-flex justify-content-around">
                                <Button type="submit" value="submit" color="primary" >Sumbit</Button>
                                <Button color="primary" onClick={()=>this.toggleLoginModal,this.toggleSignupModal}>SignUp</Button>
                            </div>
                            
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>SignUp</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name"
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    onChange={this.onChange}  />
                            </FormGroup>
                            <div className="d-flex justify-content-around">
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                                <Button color="primary" onClick={()=>this.toggleSignupModal,this.toggleLoginModal}>Login</Button>    
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <>
                            {
                                this.state.user ?
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                        </NavItem>
                                    </Nav>
                                : 
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button outline onClick={this.toggleLoginModal}><span className="fa fa-sign-in fa-lg"></span> User</Button>
                                        </NavItem>
                                    </Nav>   
                            }
                            </>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}
 
export default Header;