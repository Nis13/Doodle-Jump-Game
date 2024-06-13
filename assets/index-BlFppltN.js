var y=Object.defineProperty;var p=(h,t,e)=>t in h?y(h,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[t]=e;var i=(h,t,e)=>(p(h,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const r={CANVAS_WIDTH:700,CANVAS_HEIGHT:window.innerHeight},w=50,u=40,d=6,m=20,l=70;class g{constructor(t,e,a){i(this,"x");i(this,"y");i(this,"width");i(this,"height");i(this,"velocityY");i(this,"velocityX");i(this,"gravity");i(this,"jumpForce");i(this,"goingLeft");i(this,"leftImage");i(this,"rightImage");i(this,"ctx");i(this,"keysDown");this.ctx=t,this.x=r.CANVAS_WIDTH/2-20,this.y=r.CANVAS_HEIGHT/2,this.width=u,this.height=w,this.velocityY=0,this.velocityX=0,this.gravity=.2,this.jumpForce=10,this.goingLeft=!0,this.keysDown={},this.leftImage=new Image,this.leftImage.src=e,this.rightImage=new Image,this.rightImage.src=a,this.initKeyListener()}draw(){this.goingLeft?this.ctx.drawImage(this.leftImage,this.x,this.y,this.width,this.height):this.ctx.drawImage(this.rightImage,this.x,this.y,this.width,this.height)}update(t){this.x+this.width<0&&(this.x=r.CANVAS_WIDTH),this.x>r.CANVAS_WIDTH&&(this.x=-this.width),this.velocityY<-8&&(this.velocityY=-8),this.velocityY+=this.gravity,this.y+=this.velocityY,this.x+=this.velocityX;for(let e of t)if(this.y+this.height>=e.y&&this.y+this.height<=e.y+e.height){let a=e.x-this.width,s=e.x+e.width;this.x>=a&&this.x<=s&&this.velocityY>0&&this.jump()}}jump(){this.velocityY=-this.jumpForce}moveLeft(){this.velocityX=-4,this.goingLeft=!0}stopLeft(){this.velocityX=0}moveRight(){this.velocityX=4,this.goingLeft=!1}stopRight(){this.velocityX=0}isKeyDown(t){return t in this.keysDown}initKeyListener(){window.addEventListener("keydown",t=>{this.keysDown[t.key]=!0,t.key==="ArrowLeft"||t.key==="a"?this.moveLeft():(t.key==="ArrowRight"||t.key==="d")&&this.moveRight()}),window.addEventListener("keyup",t=>{delete this.keysDown[t.key],t.key==="ArrowLeft"||t.key==="a"?this.stopLeft():(t.key==="ArrowRight"||t.key==="d")&&this.stopRight()})}}class n{constructor(t,e,a,s){i(this,"x");i(this,"y");i(this,"height");i(this,"width");i(this,"img");i(this,"ctx");this.ctx=t,this.x=e,this.y=a,this.height=m,this.width=l,this.img=new Image,this.img.src=s}draw(){this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height)}}function f(h,t){const e=Math.ceil(h),a=Math.floor(t);return Math.floor(Math.random()*(a-e)+e)}class x{constructor(){i(this,"canvas");i(this,"ctx");i(this,"doodler");i(this,"platforms");i(this,"gap");i(this,"score");i(this,"backgroundImage");i(this,"isGameOver");i(this,"draw",()=>{if(!this.isGameOver){if(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(this.backgroundImage,0,0,this.canvas.width,this.canvas.height),this.ctx.save(),this.ctx.fillStyle="black",this.ctx.font="30px Arial",this.ctx.textAlign="center",this.ctx.fillText(this.score.toString(),this.canvas.width/2,50),this.doodler.update(this.platforms),this.doodler.draw(),this.doodler.velocityY<0&&this.doodler.y<300)for(let t of this.platforms)t.y-=this.doodler.velocityY;for(let t of this.platforms)t.draw();this.doodler.y<this.platforms[this.platforms.length-1].y+200&&this.platforms.push(new n(this.ctx,f(0,r.CANVAS_WIDTH-l),this.platforms[this.platforms.length-1].y-this.gap,"./platform.png")),this.platforms[0].y>r.CANVAS_HEIGHT&&(this.platforms.shift(),this.score++),this.doodler.y>r.CANVAS_HEIGHT&&this.gameOver(),this.ctx.restore(),requestAnimationFrame(this.draw)}});this.canvas=document.querySelector("#gameCanvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.height=r.CANVAS_HEIGHT,this.canvas.width=r.CANVAS_WIDTH,this.gap=0,this.score=0,this.backgroundImage=new Image,this.isGameOver=!1,this.backgroundImage.src="./doodlejumpbg.png",this.doodler=new g(this.ctx,"./doodler-left.png","./doodler-right.png"),this.platforms=[],this.backgroundImage.onload=()=>{this.startGame()},this.restartGame=this.restartGame.bind(this),window.addEventListener("keydown",this.restartGame)}startGame(){this.score=0,this.isGameOver=!1,this.doodler=new g(this.ctx,"./doodler-left.png","./doodler-right.png"),this.platforms=[],this.gap=r.CANVAS_HEIGHT/d,this.platforms.push(new n(this.ctx,r.CANVAS_WIDTH/2,r.CANVAS_HEIGHT-m,"./platform.png"));for(let t=1;t<=d;t++)this.platforms.push(new n(this.ctx,f(0,r.CANVAS_WIDTH-l),r.CANVAS_HEIGHT-t*this.gap,"./platform.png"));this.draw()}gameOver(){this.isGameOver=!0,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(this.backgroundImage,0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="black",this.ctx.font="30px Arial",this.ctx.textAlign="center",this.ctx.fillText("Game Over!",this.canvas.width/2,500),this.ctx.fillText(`You scored ${this.score}`,this.canvas.width/2,450),this.ctx.fillText("Press Space to Restart",this.canvas.width/2,550)}restartGame(t){if(t.key===" "&&this.isGameOver)this.isGameOver=!1,this.startGame();else if(!this.isGameOver)switch(t.key){case"ArrowLeft":case"a":this.doodler.moveLeft();break;case"ArrowRight":case"d":this.doodler.moveRight();break}}}document.addEventListener("DOMContentLoaded",()=>{const h=document.getElementById("startButton"),t=document.querySelector(".startpage");h.addEventListener("click",()=>{t.style.display="none",h.style.display="none",new x})});
