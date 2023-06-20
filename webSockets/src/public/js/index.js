const socket = io();

Swal.fire({
    title:'Registrate',
    input: 'text',
    text: 'Ingresá tu nombre de usuario para identificarte en el chat',
    inputValidator: (value) =>{
        return !value && 'Necesitas escribir un nombre de usuario para continuar'
    },
    allowOutsideClick:false
}).then(result => {
    user= result.value;
    socket.emit('authenticated', user);
});

chatBox.addEventListener('keyup', evt =>{
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user: user, message: chatBox.value});
            chatBox.value='';
        }
    }
})

socket.on('messageLogs', data =>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}</br>`
    });
    log.innerHTML = messages;
})

socket.on('newUserConnected', data => {
    if (!user) return;
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})