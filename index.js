// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server.js';

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "404",       // TODO: Your Battlesnake Username
    color: "#FFFF00", // TODO: Choose color
    head: "silly",  // TODO: Choose head
    tail: "skinny",  // TODO: Choose tail
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;

  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;

  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;

  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }
  //assignment for : Dimitris Ioakeim Michailidis
  // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (myHead.x === 0) {
    isMoveSafe.left = false;
    //  console.log(9);

  } else if (myHead.x === boardWidth - 1) {
    isMoveSafe.right = false;
    //  console.log(10);
  }

  if (myHead.y === 0) {
    isMoveSafe.down = false;
    //  console.log(11);
  } else if (myHead.y === boardHeight - 1) {
    isMoveSafe.up = false;
    // console.log(12);
  }
  //console.log("Head Possition at " + myHead.x + " " + myHead.y);

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  const myBody = gameState.you.body;
  //console.log(gameState.you.body);
  if (myBody.length > 3)// Because for unknown resons the bodylenght starts with length 3 (god help us all)
  {
    for (let i = 3; i < myBody.length; i++) {
      let bodyPart = myBody[i];
      //console.log("bodyPart: " + i + "  At Possition: " + bodyPart.x + " " + bodyPart.y);
      if (myHead.x === bodyPart.x - 1 && myHead.y === bodyPart.y) {
        isMoveSafe.right = false;
        //console.log(8);
      }
      if (myHead.x === bodyPart.x + 1 && myHead.y === bodyPart.y) {
        isMoveSafe.left = false;
        //console.log(7);
      }
      if (myHead.y === bodyPart.y - 1 && myHead.x === bodyPart.x) {
        isMoveSafe.up = false;
        //console.log(6);
      }
      if (myHead.y === bodyPart.y + 1 && myHead.x === bodyPart.x) {
        isMoveSafe.down = false;
        //console.log(5);
      }

    }
  }


  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  const opponents = gameState.board.snakes;
  if (opponents.length > 1) {
    for (let i = 0; i < opponents.length; i++) {
      let opponent = opponents[i];
      for (let j = 0; j < opponent.body.length; j++) {
        let opponentPart = opponent.body[j];
        if (myHead.x === opponentPart.x - 1 && myHead.y === opponentPart.y) {
          isMoveSafe.right = false;
          //console.log(1);
        }
        if (myHead.x === opponentPart.x + 1 && myHead.y === opponentPart.y) {
          isMoveSafe.left = false;
          //console.log(2);
        }
        if (myHead.y === opponentPart.y - 1 && myHead.x === opponentPart.x) {
          isMoveSafe.up = false;
          //console.log(3);
        }
        if (myHead.y === opponentPart.y + 1 && myHead.x === opponentPart.x) {
          isMoveSafe.down = false;
          //console.log(4);
        }
      }
    }
  }


  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  const food = gameState.board.food;
  //console.log(gameState.board.food);

  function manhattan_distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }


  let closestFood = food[0];
  let closestDistance = manhattan_distance(myHead, closestFood);

  // We go through all the positions of the food 
  for (let i = 0; i < food.length; i++) {
    const currentFood = food[i];
    const currentDistance = manhattan_distance(myHead, currentFood);

    // Compare distances to find the closest food
    if (currentDistance < closestDistance) {
      closestFood = currentFood;
      closestDistance = currentDistance;
    }
  }


  // console.log(`Closest Food at position (${closestFood.x}, ${closestFood.y})`);

  if (closestFood.x < myHead.x && isMoveSafe.left == true) {
    isMoveSafe.right = false;
  } else if (closestFood.x > myHead.x && isMoveSafe.right == true) {
    isMoveSafe.left = false;
  } else if (closestFood.y < myHead.y && isMoveSafe.up == true) {
    isMoveSafe.down = false;
  } else if (closestFood.y > myHead.y && isMoveSafe.down == true) {
    isMoveSafe.up = false;
  }



  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});