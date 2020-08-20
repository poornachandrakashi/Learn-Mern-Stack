const express = require('express');
const connectDB = require('./config/db');

const app = express()

//connect database
connectDB();

app.get('/',(req,res)=> res.send('API running'));

// const PORT = process.env.PORT |

app.listen(PORT = process.env.PORT || 5000);