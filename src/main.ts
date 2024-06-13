import './style.css';
import { CANVAS_DIMENSIONS, PLATFORM_COUNT, PLATFORM_HEIGHT, PLATFORM_WIDTH } from './Constants/Constants';
import { Doodler } from './Doodler/Doodler';
import { Platform } from './platform';

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    doodler: Doodler;
    platforms: Platform[];
    gap: number;
    score: number;
    backgroundImage: HTMLImageElement;
    isGameOver: boolean;

    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>("#gameCanvas")!;
        this.ctx = this.canvas.getContext("2d")!;
        this.canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;
        this.canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
        
        this.gap = 0; 
        this.score = 0; 
        this.backgroundImage = new Image(); 
        this.isGameOver = false; 

        this.backgroundImage.src = './doodlejumpbg.png';
        this.doodler = new Doodler(this.ctx, './doodler-left.png', './doodler-right.png');
        this.platforms = [];
        this.backgroundImage.onload = () => {
            this.startGame();
        };
        
        this.restartGame = this.restartGame.bind(this); 
        window.addEventListener('keydown', this.restartGame); 
    }

    startGame() {
        this.score = 0;
        this.isGameOver = false;
        this.doodler = new Doodler(this.ctx, './doodler-left.png', './doodler-right.png');
        this.platforms = [];
        this.gap = CANVAS_DIMENSIONS.CANVAS_HEIGHT / PLATFORM_COUNT;

        this.platforms.push(new Platform(this.ctx, CANVAS_DIMENSIONS.CANVAS_WIDTH/2, CANVAS_DIMENSIONS.CANVAS_HEIGHT-PLATFORM_HEIGHT, './platform.png'))

        for (let i = 1; i <= PLATFORM_COUNT; i++) {
            this.platforms.push(new Platform(this.ctx, getRandomInt(0, CANVAS_DIMENSIONS.CANVAS_WIDTH-PLATFORM_WIDTH), CANVAS_DIMENSIONS.CANVAS_HEIGHT - i * this.gap, './platform.png'));
        }

        this.draw();
    }

    draw = () => {
      
        if (this.isGameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.score.toString(), this.canvas.width / 2,  50);


        this.doodler.update(this.platforms);
        this.doodler.draw();


        if (this.doodler.velocityY < 0 && this.doodler.y < 300) { 
            for (let platform of this.platforms) {
                platform.y -= this.doodler.velocityY; 
            }
        }

    // Draw platforms
    for (let platform of this.platforms) {
        platform.draw();
    }

        if (this.doodler.y < this.platforms[this.platforms.length - 1].y + 200) {
            this.platforms.push(new Platform(this.ctx, getRandomInt(0, CANVAS_DIMENSIONS.CANVAS_WIDTH-PLATFORM_WIDTH), this.platforms[this.platforms.length - 1].y - this.gap, './platform.png'));
        }
        if (this.platforms[0].y > CANVAS_DIMENSIONS.CANVAS_HEIGHT) {
            this.platforms.shift();
            this.score++;
        }


        if (this.doodler.y > CANVAS_DIMENSIONS.CANVAS_HEIGHT) {
            this.gameOver();
        }

        this.ctx.restore();
        requestAnimationFrame(this.draw);
    }

    gameOver() {

        this.isGameOver = true;

        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Game Over!`, this.canvas.width / 2, 500);
        this.ctx.fillText(`You scored ${this.score}`, this.canvas.width / 2, 450);
        this.ctx.fillText(`Press Space to Restart`, this.canvas.width / 2,  550);
    }

    restartGame(event: KeyboardEvent) {
        if (event.key === " " && this.isGameOver) { 
            this.isGameOver = false;
            this.startGame();
        } else if (!this.isGameOver) { 
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                    this.doodler.moveLeft();
                    break;
                case "ArrowRight":
                case "d":
                    this.doodler.moveRight();
                    break;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton') as HTMLButtonElement;
  const startPage = document.querySelector<HTMLElement>('.startpage')!;


  startButton.addEventListener('click', () => {
      startPage.style.display ='none';
      startButton.style.display = 'none'; 
       new Game();
  });
});