if(process.env.NODE_ENV==='production'){
    module.exports={
        backendURL: process.env.BACKEND_URL,
        flaskBackendURL: process.env.FLASK_BACKEND_URL,
        JWT_SECRET: process.env.JWT_SEC
    }
}
else{
    module.exports={
        backendURL:"http://localhost:5000",
        flaskBackendURL:"http://localhost:5001",
        JWT_SECRET:"my_secret_key"
    }
}