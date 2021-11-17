require("dotenv").config();
var socket = require("socket.io");
const server = require('http').Server()
const app = express()
const io = ('socket.io')(server);
const { v4: uuidV4 } = require('uuid')

app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render(':room', {roomId: req.params.room})
})

server.listen(env.PORT)

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})
