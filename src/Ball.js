import Entity from "./main/Entity.js";
import {resource} from "./Resource.js";
import {soundEffects} from "../index.js";

export default class Ball extends Entity {
  constructor(props) {
    super(props);

    this.player_1 = props?.player_1;
    this.player_2 = props?.player_2;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.styles.fill;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(this?.x, this?.y, this?.width, this?.height);
    ctx.restore();
  }
  update(dt) {
    this.collidesWithWall();

    this.y += this.velocity.y * dt;
    this.x += this.velocity.x * dt;
  }

  collidesWithWall() {
    if (this.y + this.radius > canvas.height - 20) {
      this.velocity.y *= -1;
      soundEffects.play("wall-sound");
    }

    if (this.y - this.radius < 20) {
      this.velocity.y *= -1;
      soundEffects.play("wall-sound");
    }

    if (this.x + this.radius < 0) {
      soundEffects.play("win-sound");
      this.player_2.score += 10;
      this.reset();
      resource.ballDir = 150;
      this.velocity.x = resource.ballDir;
      if (this.player_2.score === 30) {
        resource.gameState = "win";
      } else {
        resource.playerServe = "Player 1";
        resource.gameState = "serve";
      }
    }

    if (this.x - this.radius > canvas.width) {
      soundEffects.play("win-sound");
      this.player_1.score += 10;
      this.reset();
      resource.ballDir = -150;
      this.velocity.x = resource.ballDir;
      if (this.player_1.score === 30) {
        resource.gameState = "win";
      } else {
        resource.playerServe = "Player 2";
        resource.gameState = "serve";
      }
    }
  }

  reset() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }
}
