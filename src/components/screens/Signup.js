import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
//import M from 'materialize-css'
const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [repassword,setRepassword] = useState("")
    const [email,setEmail] = useState("")
    const [toggleShow1,setToggleShow1]=useState(false)
    const [toggleShow2,setToggleShow2]=useState(false)
    
    const checkEmail = (event)=>{
        var em=event.target.value
        fetch('/email',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:em
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
               //M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                setEmail(em)
                //M.toast({html:data.message,classes:"#43a047 green darken-1"})
                
            }
         }).catch(err=>{
             console.log(err)
         })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            //M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        if(password!==repassword){
            //M.toast({html:"password does match",classes:"#c62828 red darken-3",displayLength:1500})
            return
        }
        fetch("/api/auth/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              //M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               //M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    
   return (
    //   <div className="container mycard">
    //       <div className="card auth-card input-field">
    //         <h2>Violet Labs</h2>
    //         <input
    //         type="text"
    //         placeholder="name"
    //         value={name}
    //         onChange={(e)=>setName(e.target.value)}
    //         />
    //         <input
    //         type="text"
    //         placeholder="email"
    //         onChange={(e)=>setEmail(e.target.value)}
    //         value={email}
    //         onBlur={(event)=>checkEmail(event)}
    //         />
    //         <ul style={{listStyle:"none"}}>
    //             <li>
    //                 <input
    //                 type={toggleShow1?"text":"password"}
    //                 placeholder="password"
    //                 value={password}
    //                 onChange={(e)=>setPassword(e.target.value)}
    //                 style={{float:"left",width:"80%"}}
    //                 />
    //             </li>
    //             <li>
    //                 <i class="material-icons" style={{marginTop:"2px"}} onClick={(e)=>setToggleShow1(!toggleShow1)}>remove_red_eye</i>
    //             </li>
    //         </ul>
    //         <ul style={{listStyle:"none"}}>
    //             <li>
    //                 <input
    //                 type={toggleShow2?"text":"password"}
    //                 placeholder="repassword"
    //                 value={repassword}
    //                 onChange={(e)=>setRepassword(e.target.value)}
    //                 style={{float:"left",width:"80%"}}
    //                 />
    //             </li>
    //             <li>
    //                 <i class="material-icons" style={{marginTop:"20px"}} onClick={(e)=>setToggleShow2(!toggleShow2)}>remove_red_eye</i>
    //             </li>
    //         </ul>
    //         <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
    //         onClick={()=>uploadFields()}
    //         >
    //             SignUP
    //         </button>
    //         <h5>
    //             <Link to="/login">Already have an account ?</Link>
    //         </h5>
    //     </div>
    //   </div>
    <div>
        SugnUp Component
    </div>
   )
}


export default SignUp