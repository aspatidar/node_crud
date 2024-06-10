require('dotenv').config();
const express = require('express');
const app = express();
const {connectWithPostgres, sequelize}  = require('./connection');
const routes = require('./router');
const bodyparser = require('body-parser');
const {logReqRes, handleErrors} = require('./middleware');
const cors = require('cors');


app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Define the CORS options
app.use(cors()); // Use the cors middleware with your options

// MiddleWare
app.use(logReqRes({
    origin: process.env.ORIGINS
}));

// Route 
app.use('/api', routes);


// Error Handler 
// app.use(handleErrors());

sequelize.sync().then((res) =>{
    console.log('Successfullly sync');    
}).catch((error) =>{
    console.log(error)
})

app.listen(process.env.PORT, async (req, res) =>{
    // Connetion establish 
    await connectWithPostgres();
    sequelize.sync({ force: false }).then(() => {
        console.log("Database Connected Successfully");
    });
    // console.log('Server is working');
})