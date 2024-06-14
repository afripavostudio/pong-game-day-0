export default class Entity {
  constructor(props) {
    this.id = props?.id || "";
    this.x = props?.x;
    this.y = props?.y;
    this.width = props?.width || 0;
    this.height = props?.height || 0;
    this.radius = props?.radius || 0;
    this.score = props?.score || 0;
    this.speed = props?.speed || 0;
    this.styles = props?.styles || {
      fill: "#262626",
    };
    this.velocity = props?.velocity || {
      x: 0,
      y: 0,
    };
  }

  update(dt) {}

  draw(ctx) {}
}
