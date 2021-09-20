import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import createGame from '../frontend/game.mjs'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('../frontend'))

const game = createGame()
game.start()

game.subscribe((command)=>{
    console.log(`Emmiting event? ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket)=>{
  const playerId = socket.id

  console.log(`Player connected on server with id: ${playerId}`)
  game.addPlayer({playerId})
  socket.emit('setup', game.state)

  socket.on('disconnect', ()=>{
    console.log(`Player disconnected on server with id: ${playerId}`)
    game.removePlayer({playerId})
  })

  socket.on('move-player', (command)=>{
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })
})


server.listen(3000, ()=> console.log('Listen the port 3000'))