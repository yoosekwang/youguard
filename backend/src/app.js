const express = require('express')
const { json } = require('body-parser');
const authRoutes = require('./routes/authRoutes')
const adminAuthRoutes = require('./routes/adminAuthRoutes')
const messageRoutes = require('./routes/messageRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const softwareRoutes = require('./routes/softwareRoutes')
const userRoutes = require('./routes/userRoutes')
const regionRoutes = require('./routes/regionRoutes')
const bodyParser = require('body-parser')
const connectDB = require('../src/config/db')
const app = express();
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const cors = require('cors')

connectDB()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))

app.use(cors({
    origin: "*",  // Allows all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
  }));
  

//routes
app.use('/api', authRoutes)
app.use('/api', messageRoutes)
app.use('/api', notificationRoutes)
app.use('/api', adminAuthRoutes)
app.use('/api', softwareRoutes)
app.use('/api', userRoutes)
app.use('/api', regionRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.use('/', (req, res) => {
//     res.status(200).json('Welcome to Watermark Distribution Center')
// })

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening for requests on port', port)
})