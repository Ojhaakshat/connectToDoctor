var socket = io.connect('http://localhost:3000');
const videoGrid = document.getElementById("video-grid");

const user = prompt("Enter Your Good Name");

console.log('server peer declare');

const peer = new Peer(undefined, {
  host: 'localhost',
  port: 3000,
  path: '/'
});

console.log('server peer d');

const myVideo = document.createElement("video");
let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
      myVideoStream = stream;
      addVideoStream(myVideo, stream);

      peer.on("call", (call) => {
        const answerCall = confirm("Do you want to answer?");
        if(answerCall) {
            call.answer(stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
            });
        } else {
            console.log("call denied");
        }
    });  
    socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
    });  
  });

  // co/rver peer d');

// hum initially yahan hai 
// neeche dekh ek key printednhai 

peer.on("open", (id) => {
    console.log('room id is',ROOM_ID);
    socket.emit("join-room", ROOM_ID, id, user);
});

// console.log('server peer d');


const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
};

// console.log('server peer d');


const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};


// console.log('server peer d');
