const { Server } = require('socket.io');

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

const getIO = () => {
    if (!io) {
        throw new Error("Socket not initialized");
    }

    return io;
};

module.exports = { initSocket, getIO };