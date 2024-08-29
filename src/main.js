require("dotenv").config();
const { app } = require('./app')
const { dBConnect } = require('./db/connectDB')


dBConnect()
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log(`Server running on port ${process.env.PORT} ...`)
    })
})
.catch((error)=>{
    console.log(`Error While connection to database : ${error}`);
    process.exit(1);
})
