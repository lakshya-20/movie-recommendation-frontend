import React, {useState, useContext} from 'react';
import {usercontext} from '../../../App';
import {useHistory} from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Col} from 'reactstrap';
import {toast} from 'react-toastify';

const Login = ({toggleAuthModal}) =>{
  const {dispatch} = useContext(usercontext);
  const history = useHistory();
  const [user, setUser] = useState({
    email: null,
    password: null
  })

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const email = user.email;
      const password = user.password;
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        toast.error("Invalid email");
        return;
      }
      if(password == null){
        toast.error("Password Required");
        return;
      }

      fetch(process.env.REACT_APP_BACKENDURL+"/api/auth/signin",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })
      .then(res=> res.json())
      .then(data=>{
        if(data.error){
          throw new Error(data.error);
        }
        else{
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user",JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user});
          toast.success("Login Success");
          toggleAuthModal();
          history.push('/');
        }
      }).catch( err => {
        toast.error(err.message);
      })
    } catch (ex) {
      toast.error("Some error occured");
    }
  }

  return(
    <div className='col-12'>
      <Form onSubmit={handleLogin}>
        <FormGroup row>
            <Label htmlFor="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="text" id="email" name="email" onChange={onChange} />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label htmlFor="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" id="password" name="password" onChange={onChange}/>
            </Col>
        </FormGroup>
        <div className="d-flex justify-content-around">
            <Button type="submit" value="submit" color="primary" >Sumbit</Button>
        </div>
    </Form>
    </div>
  )
}
export default Login;