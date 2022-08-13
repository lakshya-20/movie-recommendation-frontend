import React, {useState, useContext} from 'react';
import {usercontext} from '../../../App';
import {useHistory} from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Col} from 'reactstrap';
import {toast} from 'react-toastify';

const Signup  = ({toggleAuthModal}) => {
    const {dispatch} = useContext(usercontext);
    const history = useHistory();
    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null,
        re_password: null,
        gender: null
    })
    
    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    }

    const handleSignup = (e) => {
        e.preventDefault();
        try{
            const email=user.email;
            const password=user.password;
            const repassword=user.repassword;
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                toast.error("Invalid email");
                return;
            }
            if(password!==repassword){
                toast.error("Password does not match");
                return;
            }
            const payload = {
                name: user.name,
                email: user.email,
                password: user.password,
                gender: user.gender
            }
            fetch(process.env.REACT_APP_BACKENDURL+"/api/auth/signup",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.error){
                    throw new Error(data.error);
                }
                else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    toast.success("Signup Success");
                    toggleAuthModal();
                    history.push('/');
                }
            }).catch( err => {
                toast.error(err.message);
            })
        } catch (err) {
            toast.error("Some error occured");
        }
    }

   return (
    <div className='col-12'>
        <Form onSubmit={handleSignup}>
            <FormGroup row>
                <Label htmlFor="name" sm={2}>Name</Label>
                <Col sm={10}>
                    <Input type="text" id="name" name="name"
                        onChange={onChange}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label htmlFor="email" sm={2}>Email</Label>
                <Col sm={10}>
                    <Input type="text" id="email" name="email"
                        onChange={onChange}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label htmlFor="password" sm={2}>Password</Label>
                <Col sm={10}>
                    <Input type="password" id="password" name="password"
                        onChange={onChange}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label htmlFor="repassword" sm={2}>Re Password</Label>
                <Col sm={10}>
                    <Input type="password" id="repassword" name="repassword"
                        onChange={onChange}/>
                </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row>
                <Label htmlFor="gender" sm={2}>Gender</Label>
                <div className="col-10 d-flex justify-content-around align-items-center">
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="gender" value="male" onChange={onChange}/>
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
            </div>
        </Form>
    </div>
   )
}
export default Signup;