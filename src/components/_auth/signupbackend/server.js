const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = 3000;
mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is up and running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to database:', error));

app.use(express.json());
app.use(cors());
app.use('/app', routes);




// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// const dotenv =require('dotenv')
// const routesUrls = require('./routes/routes')
// const cors = require ('cors')
// dotenv.config()


// mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

// app.use(express.json())
// app.use(cors())
// app.use('/app', routesUrls)
// app.listen(8080, () => console.log("server is up and running"))
