/// <reference path="./gameObject.ts" />
/// <reference path="./game.ts" />

class Enemy extends GameObject {
    
    private game:Game
    private speed: number = 0

    constructor(x:number, y:number, el:string, g:Game) { 
        super(x, y, el)
        this.game = g

    }

    public update():void {
        this.setX( this.getX() + this.speed )
        this.move()

        if(this.getX() > window.innerWidth) {
            this.setX(Math.floor(Math.random()*-1000 + -300))
        }


        // if (this.Enemy.x < this.Enemy.minWidth)
        // {
        //     this.Enemy.x = this.Enemy.minWidth
        //     this.Enemy.speedX *= -1
        //     this.Enemy.speedX *= this.Enemy.friction
        // }
        // if(this.Enemy.x > this.Enemy.maxWidth) {
        //     this.Enemy.x = this.Enemy.maxWidth
        //     this.Enemy.speedX *= -1
        //     this.Enemy.speedX *= this.Enemy.friction
        // }
        // if (this.Enemy.y + this.Enemy.speedY > this.Enemy.maxHeight)
        // {
        //     this.Enemy.y = this.Enemy.maxHeight;
        //     this.Enemy.speedY *= -1
        //     // Weerstand
        //     this.Enemy.speedY *= this.Enemy.friction
        //     this.Enemy.speedX *= this.Enemy.friction
        // }
        // else {
        //     this.Enemy.speedY += this.Enemy.gravity
        // }    

        // if(this.Enemy.x > window.innerWidth/2){
        //     this.Enemy.behaviour = new Bouncing (this.Enemy)         
        // }


        // this.Enemy.x += this.Enemy.speedX
        // this.Enemy.y += this.Enemy.speedY
        
        // this.Enemy.draw()
    }
}