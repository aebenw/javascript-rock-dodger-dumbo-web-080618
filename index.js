/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


function checkCollision(rock) {

    const top = positionToInteger(rock.style.top)
    // debugger
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    if (top > 360){
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)


    const rockRightEdge = rockLeftEdge + 20;


    // collides if the rock's left edge is <= the DODGER's left edge and the rock's right edge is >= the DODGER's left edge

    if (((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) || ((rockRightEdge < dodgerRightEdge) && (rockLeftEdge > dodgerLeftEdge)) || ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge))){
      rock.remove()
      return true
      /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */} else {
      return false
    }
  }
  return false
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top


  GAME.appendChild(rock)

  moveRock(rock)
  return rock
 }

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
   // ************* Maybe use an iffe here?

  function moveRock(el) {

    let top = parseInt(el.style.top)
    // debugger
    if (top <= 380){
      function step(){
      el.style.top = `${top += 2}px`
     if (checkCollision(el)){
       endGame()
     }
     else if (top <= 380){
       window.requestAnimationFrame(step)
     }
     else{
       el.remove()
     }
   }
   window.requestAnimationFrame(step)
  }
  else{
   el.remove()
  }
}

    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */


  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  // ROCKS.push(rock)

  // Finally, return the rock element you've created
  // return rock


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach((rock)=>{
      rock.remove()
  })
  window.removeEventListener('keydown', moveDodger)

  GAME.removeChild(GAME.lastChild)
  window.alert("YOU LOSE FUCKER")

  while (GAME.firstChild) {
    GAME.removeChild(GAME.firstChild);
  }

}

function moveDodger(e) {


    if (e.which === LEFT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft(e)
    } else if (e.which === RIGHT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight(e)
    }

}

function moveDodgerLeft(e) {

let posLeft = positionToInteger(DODGER.style.left)

 function step() {

   if (posLeft >= 4) {
     DODGER.style.left = `${posLeft -= 4}px`

     window.requestAnimationFrame(step)
   }
 }
 return window.requestAnimationFrame(step)
}

function moveDodgerRight(el) {
  let posLeft = positionToInteger(DODGER.style.left)
  // debugger
   function step() {

     if (posLeft <= 356) {
       DODGER.style.left = `${posLeft += 4}px`

       window.requestAnimationFrame(step)
     }

   }
   return window.requestAnimationFrame(step)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
