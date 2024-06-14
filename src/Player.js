import Entity from "./main/Entity.js";
import {resource} from "./Resource.js";
import {soundEffects} from "../index.js";

export default class Player extends Entity {
  constructor(props) {
    super(props);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.styles.fill;
    ctx.fillRect(this?.x, this?.y, this?.width, this?.height);
    ctx.restore();
  }

  update(dt) {
    if (this.id === "Player 1") {
      if (resource.keyPressed["e"]) {
        this.velocity.y = -this.speed;
      } else if (resource.keyPressed["d"]) {
        this.velocity.y = this.speed;
      } else if (!resource.keyPressed["e"] && !resource.keyPressed["d"]) {
        this.velocity.y = 0;
      }
    }

    if (this.id === "Player 2") {
      if (resource.keyPressed["o"]) {
        this.velocity.y = -this.speed;
      } else if (resource.keyPressed["k"]) {
        this.velocity.y = this.speed;
      } else if (!resource.keyPressed["o"] && !resource.keyPressed["k"]) {
        this.velocity.y = 0;
      }
    }

    if (this.y < 0) {
      this.y = 0;
      return;
    } else if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      return;
    } else {
      this.y += this.velocity.y * dt;
    }
    // this.x += this.velocity.x * dt;
  }
  collides(ball) {
    if (
      ball.x - ball.radius < this.x + this.width &&
      ball.x + ball.radius > this.x &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      resource.playerServe = this.id;
      soundEffects.play("paddle-sound");
      ball.velocity.x *= -1;
      ball.velocity.x += 10;
    }
  }
}
