# Battlesnake JavaScript Starter Project

An official Battlesnake template written in JavaScript. Get started at [play.battlesnake.com](https://play.battlesnake.com).

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

This project is a great starting point for anyone wanting to program their first Battlesnake in JavaScript. It can be run locally or easily deployed to a cloud provider of your choosing. See the [Battlesnake API Docs](https://docs.battlesnake.com/api) for more detail. 

[![Run on Replit](https://repl.it/badge/github/BattlesnakeOfficial/starter-snake-javascript)](https://replit.com/@Battlesnake/starter-snake-javascript)

## Technologies Used

This project uses [Node.js](https://nodejs.dev/) and [Express](https://expressjs.com/). It also comes with an optional [Dockerfile](https://docs.docker.com/engine/reference/builder/) to help with deployment.

## Run Your Battlesnake

Install dependencies using npm

```sh
npm install
```

Start your Battlesnake

```sh
npm run start
```

You should see the following output once it is running

```sh
Running Battlesnake at http://0.0.0.0:8000
```

Open [localhost:8000](http://localhost:8000) in your browser and you should see

```json
{"apiversion":"1","author":"","color":"#888888","head":"default","tail":"default"}
```

## Play a Game Locally

Install the [Battlesnake CLI](https://github.com/BattlesnakeOfficial/rules/tree/main/cli)
* You can [download compiled binaries here](https://github.com/BattlesnakeOfficial/rules/releases)
* or [install as a go package](https://github.com/BattlesnakeOfficial/rules/tree/main/cli#installation) (requires Go 1.18 or higher)

Command to run a local game

```sh
battlesnake play -W 11 -H 11 --name 'JavaScript Starter Project' --url http://localhost:8000 -g solo --browser
```

## Next Steps

Continue with the [Battlesnake Quickstart Guide](https://docs.battlesnake.com/quickstart) to customize and improve your Battlesnake's behavior.

**Note:** To play games on [play.battlesnake.com](https://play.battlesnake.com) you'll need to deploy your Battlesnake to a live web server OR use a port forwarding tool like [ngrok](https://ngrok.com/) to access your server locally.

# Battlesnake AI

## Description
This project contains the AI logic for a Battlesnake, a multiplayer snake game where the goal is to survive and grow longer than your opponents. The AI uses a set of rules to navigate the snake on the game board, avoid collisions, and make strategic moves to outmaneuver opponents.

## Features
- Backward Movement Prevention: Ensures the snake doesn't reverse into itself.
- Boundary Awareness: Prevents the snake from moving out of bounds.
- Self-Collision Avoidance: Detects and avoids colliding with its own body.
- Opponent Collision Avoidance: Detects and avoids colliding with other snakes.
- Food Seeking Behavior: Directs the snake towards the closest food item.
- Tail Chasing Tactics: Includes logic to follow opponents' tails when safe.

## Installation
- Clone the repository:

git clone [URL_of_This_Repository]
Navigate to the project directory:

cd [Project_Directory]
Install dependencies (if any):

npm install
Usage
To run the Battlesnake AI, execute the server script:

node server.js

## Configuration
- Edit the info function in the main script to customize your Battlesnake's appearance:

- apiversion: API version used (default: "1").
- author: Your Battlesnake username.
- color: Hex code for the snake's color.
- head: Type of the snake's head.
- tail: Type of the snake's tail.

## Contributing
Contributions to this project are welcome. Please follow these steps:

- Fork the repository.
- Create a new branch: git checkout -b feature-branch.
- Make your changes and commit them: git commit -m 'Commit message'.
- Push to the original branch: git push origin [Project_Directory]/[Feature-Branch].
- Create the pull request.

Alternatively, see the GitHub documentation on creating a pull request.