const express = require('express');
const app = express();
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT,function(){
                console.log("server connected");
            });
var socketIO = require("socket.io");
var io = socketIO(server);
              
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room',(req,res)=>{
    res.render("videoChat",{roomID:req.params.room});
})

io.on('connection',(socket)=>{

    socket.on('join-room',(roomId,userId,userName)=>{
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
        socket.on("message",(req,res)=>{
            io.to(roomId).emit('createMessage',message,userName);
        });
    });
});
