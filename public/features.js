// const socket = io("/");
let messagetype = document.getElementById('type_message');
let btn = document.getElementById('send');
let message = document.getElementById('message');


btn.addEventListener('click',(e)=>{
    if(messagetype.value.length!=0){
        socket.emit('message',messagetype.value);
        messagetype.value = "";
    }
});


messagetype.addEventListener('keydown',(e)=>{
    if(e.key === "Enter" && messagetype.value.length!==0){
        socket.emit('message',messagetype.value);
        messagetype.value = "";
    }
});


const cam = document.getElementById('cam');
const mic = document.getElementById('mic');
const inviteb = document.getElementById('invite');

mic.addEventListener('click',()=>{
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if(enabled){
        myVideoStream.getAudioTracks()[0].enabled = false;
        mic.classList.toggle("background__red");
    }else{
        myVideoStream.getAudioTracks()[0].enabled = true;
        muteButton.classList.toggle("background__red");
    }
});

cam.addEventListener('click',()=>{
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled){
        myVideoStream.getVideoTracks()[0].enabled = false;
    }else{
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
})


inviteb.addEventListener('click',(e)=>{
    prompt(
        "Copy this link and send it to people you want to invite",window.location.href
    )
});


socket.on('createMessage',(message,userName) => {
    message.innerHTML = message.innerHTML + `<div class="msg">
        <b><span> ${
        userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});


