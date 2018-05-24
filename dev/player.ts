/// <reference path="./gameObject.ts" />
/// <reference path="./game.ts" />

class Player extends GameObject {
    
    private game:Game
    private xspeed:number = 0
    private yspeed:number = 0

    constructor(x:number, y:number, el:string, g:Game) { 
        super(x, y, el)
        this.game = g
        // this.speed = 5

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
    }

    public update():void {

        this.setX( this.getX() + this.xspeed )
        this.setY( this.getY() + this.yspeed )
        this.move()

        if(this.getX() > window.innerWidth) {
            this.setX(Math.floor(Math.random()*-1000 + -300))
        }
    
    }


    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 39:
                this.xspeed = 10
                break
            case 37:
                this.xspeed = -10
                break
            case 38:
                this.yspeed = -10
                break
            case 40:
                this.yspeed = 10
                break
            }
    }

    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 39:
                this.xspeed = 0
                break
            case 37:
                this.xspeed = 0
                break
            case 38:
                this.yspeed = 0
                break
            case 40:
                this.yspeed = 0
                break
            }
    }
}