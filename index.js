import {resource} from "./src/Resource.js";
import Player from "./src/Player.js";
import Ball from "./src/Ball.js";
import AudioManager from "./src/AudioManager.js";

const canvas = document.getElementById("canvas");

canvas.width = Math.min(640 + 16 * 10, window.innerWidth);
canvas.height = Math.min(480, window.innerHeight);

canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

const ctx = canvas.getContext("2d");

let elapsedTime = 0,
  fps = 0,
  fpsEl = document.getElementById("fps");

resource.keyPressed = {};
resource.gameState = "serve";
resource.playerServe = "Player 1";
resource.ballDir = 150;

const soundEffects = new AudioManager();
const musicEffects = new AudioManager();

soundEffects.addSounds([
  {
    name: "wall-sound",
    audio: document.getElementById("wall-sound"),
  },
  {
    name: "paddle-sound",
    audio: document.getElementById("paddle-sound"),
  },
  {
    name: "win-sound",
    audio: document.getElementById("win-sound"),
  },
]);

export {soundEffects};

window.onload = function () {
  const player_1 = new Player({
    id: "Player 1",
    x: 20,
    y: 80,
    width: 16,
    height: 80,
    score: 0,
    speed: 150,
    styles: {
      fill: "orange",
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  const player_2 = new Player({
    id: "Player 2",
    x: canvas.width - 40,
    y: 80,
    width: 16,
    height: 80,
    score: 0,
    speed: 150,
    styles: {
      fill: "salmon",
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  const ball = new Ball({
    id: "Ball",
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speed: 150,
    styles: {
      fill: "dodgerblue",
    },
    velocity: {
      x: resource.ballDir,
      y: -150,
    },
    player_1,
    player_2,
  });

  function gameLoop(dt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = (dt - elapsedTime) / 1000;

    elapsedTime = dt;

    // Calculate FPS
    fps = 1 / deltaTime;
    fpsEl.innerHTML = Math.floor(fps);

    // update scene objects
    update(deltaTime);

    // define a game loop
    draw();

    requestAnimationFrame(gameLoop);
  }

  function update(dt) {
    if (resource.gameState === "serve") {
      // Inputs
      if (resource.keyPressed[" "] && resource.gameState === "serve") {
        resource.gameState = "play";
      }
      // logic
      player_1.update(dt);
      player_2.update(dt);
    }
    if (resource.gameState === "play") {
      // Inputs
      if (resource.keyPressed["Escape"] && resource.gameState === "play") {
        ball.reset();
        resource.gameState = "serve";
      }
      // logic
      player_1.update(dt);
      player_2.update(dt);
      ball.update(dt);

      player_1.collides(ball);
      player_2.collides(ball);
    }

    if (resource.gameState === "win") {
      // Inputs
      if (resource.keyPressed["Enter"] && resource.gameState === "win") {
        if (resource.playerServe === "Player 1") {
          resource.playerServe = "Player 2";
        } else {
          resource.playerServe = "Player 1";
        }
        player_1.score = 0;
        player_2.score = 0;
        resource.gameState = "serve";
      }
    }
  }

  function draw() {
    ctx.save();
    ctx.lineWidth = 20;
    ctx.fillStyle = "whitesmoke";
    ctx.strokeStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (resource.gameState === "win") {
      // logic

      const title = resource.playerServe + " " + "Wins!!";
      const subtitle = "Press the Enter to restart";
      const score = player_1.score + "-" + player_2.score;

      ctx.save();
      ctx.font = "bold 48px font-2d";
      ctx.fillText(
        title,
        canvas.width / 2 - ctx.measureText(title)?.width / 2,
        canvas.height / 2 - 80
      );
      ctx.restore();

      ctx.save();
      ctx.font = "bold 18px font-2d";
      ctx.fillText(
        subtitle,
        canvas.width / 2 - ctx.measureText(subtitle)?.width / 2,
        canvas.height / 2 - 40
      );
      ctx.restore();
      ctx.save();
      ctx.font = "bold 72px font-2d";
      ctx.fillText(
        score,
        canvas.width / 2 - ctx.measureText(score)?.width / 2,
        canvas.height / 2 + 64
      );
      ctx.restore();
    }
    if (resource.gameState === "serve") {
      // logic

      const title = resource.playerServe + " " + "Ready!!";
      const subtitle = "Press the space bar to start";
      const score = player_1.score + "-" + player_2.score;

      ctx.save();
      ctx.font = "bold 48px font-2d";
      ctx.fillText(
        title,
        canvas.width / 2 - ctx.measureText(title)?.width / 2,
        canvas.height / 2 - 80
      );
      ctx.restore();

      ctx.save();
      ctx.font = "bold 18px font-2d";
      ctx.fillText(
        subtitle,
        canvas.width / 2 - ctx.measureText(subtitle)?.width / 2,
        canvas.height / 2 - 40
      );
      ctx.restore();
      ctx.save();
      ctx.font = "bold 72px font-2d";
      ctx.fillText(
        score,
        canvas.width / 2 - ctx.measureText(score)?.width / 2,
        canvas.height / 2 + 64
      );
      ctx.restore();

      player_1.draw(ctx);
      player_2.draw(ctx);
      ball.draw(ctx);
    }
    if (resource.gameState === "play") {
      ctx.save();
      ctx.font = "bold 18px font-2d";
      ctx.fillText(
        "Ball Speed" + " " + Math.floor(Math.abs(ball.velocity.x)) + "px/ms",
        canvas.width / 2 -
          ctx.measureText(
            "Ball Speed" + " " + Math.floor(Math.abs(ball.velocity.x) + "px/ms")
          )?.width /
            2,
        30
      );
      ctx.restore();
      // logic
      player_1.draw(ctx);
      player_2.draw(ctx);

      ball.draw(ctx);
    }
  }

  requestAnimationFrame(gameLoop);

  // EVENTS
  window.onkeydown = function (e) {
    const key = e.key;

    resource.keyPressed[key] = true;
  };
  window.onkeyup = function (e) {
    const key = e.key;

    resource.keyPressed[key] = false;
  };
};
