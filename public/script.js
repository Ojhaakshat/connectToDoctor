const socket = io("/");
const vidoGrid = document.getElementById("vido-grid");

const user = prompt("Enter Your Good Name");
const peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443",
});

const myVideo = document.createElement("video");
const myVideoStream;
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
peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id, user);
});
const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
};
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};
