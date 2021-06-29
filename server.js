const express = require('express');
const app = express();
const { v4: uuidv4 } = require("uuid");

const PORT =  3000;
var server = app.listen(PORT,function(){
                console.log("server connected");
            });
var socketIO = require("socket.io");
var io = socketIO(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    path: '/'
//   });
   
app.use('/peerjs', peerServer);

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room',(req,res)=>{
    res.render("videoChat",{roomID:req.params.room});
});

io.on('connection',(socket)=>{

    console.log(socket.id);
    socket.on('join-room',(roomId,userId,userName)=>{
        socket.join(roomId);
        console.log(userName);
        socket.to(roomId).broadcast.emit('user-connected',userId);


        socket.on('message', (msg) => {
            console.log('message: ' + msg);
            io.to(roomId).emit('createMessage',message,userName);
        });


    });
});