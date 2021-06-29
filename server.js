const express = require('express');
const app = express();
const server = requre('http').Server(app);

app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.send('started');
});


app.listen(3000,(req,res)=>{
    console.log('serving on port 3000');
})