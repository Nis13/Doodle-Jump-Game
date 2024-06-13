import { DOODLER_WIDTH, DOODLER_HEIGHT, CANVAS_DIMENSIONS } from "../Constants/Constants";
import { Platform } from "../platform";

export class Doodler {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number; 
    velocityX: number; 
    gravity: number;
    jumpForce: number;
    goingLeft: boolean;
    leftImage: HTMLImageElement;
    rightImage: HTMLImageElement;
    ctx: CanvasRenderingContext2D;
    keysDown: { [key: string]: boolean };

    constructor(ctx: CanvasRenderingContext2D, leftSrc: string, rightSrc: string) {
        this.ctx = ctx;
        this.x = CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 20;
        this.y = CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2;
        this.width = DOODLER_WIDTH;
        this.height = DOODLER_HEIGHT;
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = 0.2;
        this.jumpForce = 10;
        this.goingLeft = true;
        this.keysDown = {};

        this.leftImage = new Image();
        this.leftImage.src = leftSrc;
        this.rightImage = new Image();
        this.rightImage.src = rightSrc;

        this.initKeyListener();
    }

    draw() {
        if (this.goingLeft) {
            this.ctx.drawImage(this.leftImage, this.x, this.y, this.width, this.height);
        } else {
            this.ctx.drawImage(this.rightImage, this.x, this.y, this.width, this.height);
        }
    }

    update(platforms: Platform[]) {
        if (this.x + this.width < 0) this.x = CANVAS_DIMENSIONS.CANVAS_WIDTH;  
        if (this.x > CANVAS_DIMENSIONS.CANVAS_WIDTH) this.x = -this.width;
        if (this.velocityY < -8) this.velocityY = -8;

        this.velocityY += this.gravity;
        this.y += this.velocityY;
        
        this.x += this.velocityX;
            for (let platform of platforms) {
                
                if (this.y + this.height >= platform.y && this.y + this.height <= platform.y + platform.height) {
                    let minX = platform.x - this.width;
                let maxX = platform.x + platform.width;
            
            if (this.x >= minX && this.x <= maxX && this.velocityY>0) {
                this.jump();
            }
        }
    }
        
    }

    jump() {
        this.velocityY = -this.jumpForce; 
    }

    moveLeft() {
        this.velocityX = -4; 
        this.goingLeft = true;
    }

    stopLeft() {
        this.velocityX = 0;  
    }

    moveRight() {
        this.velocityX = 4;  
        this.goingLeft = false;
    }

    stopRight() {
        this.velocityX = 0;  
    }

    isKeyDown(key: string) {
        return key in this.keysDown;
    }

    initKeyListener() {
        window.addEventListener("keydown", (event) => {
            this.keysDown[event.key] = true;
            if (event.key === "ArrowLeft" || event.key === "a") {
                this.moveLeft();
            } else if (event.key === "ArrowRight" || event.key === "d") {
                this.moveRight();
            }
        });
        window.addEventListener("keyup", (event) => {
            delete this.keysDown[event.key];
            if (event.key === "ArrowLeft" || event.key === "a") {
                this.stopLeft();
            } else if (event.key === "ArrowRight" || event.key === "d") {
                this.stopRight();
            }
        });
    }
}
