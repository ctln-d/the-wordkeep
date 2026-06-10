require('./config/db')

const express = require('express')();
const app = express();

const port = 3002;

const UserRouter = require('./api/user');

// accept post form data
app.use(express.json());

app.use('/user', UserRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
