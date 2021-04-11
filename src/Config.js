var data={
    backendURL:"http://localhost:5000",
    flaskBackendURL:"http://localhost:5001",
    JWT_SECRET:"my_secret_key"
}
if(process.env.NODE_ENV==='production'){
    data={
        backendURL: "https://flick--backend.herokuapp.com",
        flaskBackendURL: "https://flick-flask.herokuapp.com",
        JWT_SECRET: process.env.JWT_SEC
    }
}
// else{
//     data={
//         backendURL:"http://localhost:5000",
//         flaskBackendURL:"http://localhost:5001",
//         JWT_SECRET:"my_secret_key"
//     }
// }
module.exports=data;