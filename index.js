const express = require('express');
const app = express();
const {connectWithPostgres, sequelize}  = require('./connection');
const routes = require('./router');
const bodyparser = require('body-parser');
const {logReqRes, handleErrors} = require('./middleware');

app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// MiddleWare
app.use(logReqRes());

// Route 
app.use('/api', routes);

// Error Handler 
// app.use(handleErrors());

sequelize.sync().then((res) =>{
    console.log('Successfullly sync');    
}).catch((error) =>{
    console.log(error)
})

app.listen(3000, async (req, res) =>{
    // Connetion establish 
    await connectWithPostgres();
    sequelize.sync({ force: false }).then(() => {
        console.log("Database Connected Successfully");
    });
    // console.log('Server is working');
})