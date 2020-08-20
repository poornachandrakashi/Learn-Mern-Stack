const express = require('express');

const app = express()

app.get('/',(req,res)=> res.send('API running'));

// const PORT = process.env.PORT |

app.listen(PORT = process.env.PORT || 5000);