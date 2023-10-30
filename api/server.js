// calling dependencies
const express = require("express")
const mongoose = require("mongoose")
const UserRoute = require("./Routes/UserRoute")

// initialized db_connection
mongoose.connect('mongodb://localhost/easychat')
    .then((res)=>console.log(`successfully connected to the database`))
    .catch((err)=>console.log(`connection to the database failed ${err.message}`))


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/auth', UserRoute)

app.listen(4000, ()=>console.log(`server started on port 4000`))