import { PLATFORM_HEIGHT, PLATFORM_WIDTH } from "./Constants/Constants";

export class Platform {
  x: number;
  y: number;
  height: number;
  width: number;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, imgSrc: string) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.height = PLATFORM_HEIGHT;
      this.width = PLATFORM_WIDTH;

      this.img = new Image();
      this.img.src = imgSrc;
  }

  draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
