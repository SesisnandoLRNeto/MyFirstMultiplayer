export default function renderScreen (screen, game, requestAnimationFrame, currentPlayerId) {
  const context = screen.getContext('2d')
 
  const colorPlayer = 'black' 
  const colorFruit = 'green'
  const colorScreenClear = 'white'
  const colorCurrentPlayer = '#F0DB4F'

  const width = 1
  const height = 1

  context.fillStyle = colorScreenClear
  context.clearRect(0, 0, 10, 10)

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = colorPlayer
    context.fillRect(player.x, player.y, width, height)
  }
  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId]
    context.fillStyle = colorFruit
    context.fillRect(fruit.x, fruit.y, width, height)
  }

  setTimeout(()=>{
    const currentPlayer = game.state.players[currentPlayerId]
    if(currentPlayer) { 
      context.fillStyle = colorCurrentPlayer
      context.fillRect(currentPlayer.x, currentPlayer.y, width, height)
    }
  })



  requestAnimationFrame(()=>{ 
    renderScreen(screen, game, requestAnimationFrame)
  })
}
