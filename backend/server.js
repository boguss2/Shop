const app = require('./app');
const mongoose = require('mongoose');

// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})


// config
if(process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path:"backend/config/.env"
    })

}

mongoose.connect(process.env.DB_URL)
    .then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`);
    }).catch((error) => console.log('Connection failure', error));

// create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})