var data={
    backendURL:"http://localhost:5000",
    flaskBackendURL:"http://localhost:5001",
    JWT_SECRET:"my_secret_key"
}
if(process.env.NODE_ENV==='production'){
    data={
        backendURL: "https://movie-recommendation-backend.vercel.app",
        flaskBackendURL: "https://movie-recommendation-engine.vercel.app",
        JWT_SECRET: process.env.JWT_SEC
    }
}
module.exports=data;
