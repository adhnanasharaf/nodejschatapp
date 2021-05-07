const socket = io()

let joinerName ;
let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do{  
    joinerName = prompt('please enter your name');
}while(!joinerName)

textArea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sentMessage(e.target.value)
    }
})

function sentMessage(message){
       
    let msg = {
        user : joinerName,
        message : message.trim()       
    }
    
    appendMessage(msg ,'outgoing')
    textArea.value=''
    scrollToBottom()
    //sent to server

    socket.emit('message',msg)

}

function appendMessage(msg,type){
    let mainDiv = document.createElement("div")
    let classname = type
    mainDiv.classList.add(classname,'message')
   
    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</P>
    `
mainDiv.innerHTML = markUp
messageArea.appendChild(mainDiv)


}

socket.on('message',(msg)=>{
    appendMessage(msg,'incomming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}