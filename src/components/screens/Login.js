import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {usercontext} from '../../App'
//import M from 'materialize-css'
const Login =()=>{
    const {state,dispatch}=useContext(usercontext)
    const history=useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [toggleShow,setToggleShow]=useState(false)

    const PostData=()=>{
        console.log("jhj")
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            //M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
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
                //M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                alert("Okay!")
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                //M.toast({html:"signedin successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }


    return(
        // <div className="mycard">
        //     <div className="card auth-card input-field">
        //         <h2>Violet Labs</h2>
        //         <input type="text" placeholder="email" value={email}
        //         onChange={(e)=>setEmail(e.target.value)}/>
        //         <ul style={{listStyle:"none"}}>
        //             <li>
        //                 <input
        //                 type={toggleShow?"text":"password"}
        //                 placeholder="password"
        //                 value={password}
        //                 onChange={(e)=>setPassword(e.target.value)}
        //                 style={{float:"left",width:"80%"}}
        //                 />
        //             </li>
        //             <li>
        //                 <i class="material-icons" style={{marginTop:"20px"}} onClick={(e)=>setToggleShow(!toggleShow)}>remove_red_eye</i>
        //             </li>
        //         </ul>
        //         <button className="btn waves-eddect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
        //             Login
        //         </button>
        //         <h5>
        //             <Link to="/signup">Dont have an account ?</Link>
        //         </h5>
        //     </div>
        // </div>
        <div>
            Login Component
        </div>

    )
}
export default Login;