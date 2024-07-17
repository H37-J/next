const {contextBridge, ipcRenderer} = require('electron');
const axios = require('axios');


contextBridge.exposeInMainWorld('electronAPI', {
    handleClick: (callback) => ipcRenderer.on('button-click', callback),
    sendClick: () => ipcRenderer.send('button-click'),
    tt: () => test(),
    someValue: 'Hello from preload'
});

const test = () => {
    axios.get('https://api.example.com/data')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}