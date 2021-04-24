module.exports = app => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server, {
        cors: {
            origin: '*'
        }
    });
    io.on('connection', (socket) => {
        socket.on('createPicIdRoom', picId => {
            socket.join(picId)
            socket.on('chat', message => {
                io.to(picId).emit('chat', message)
            });
        });
    });
    return server;
}