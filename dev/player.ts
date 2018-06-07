/// <reference path="./gameObject.ts" />
/// <reference path="./game.ts" />
/// <reference path="./Weapons/lasergun.ts" />


class Player extends GameObject {
    
    private game:Game
    private lasergun:Lasergun

    private xspeed:number = 0
    private yspeed:number = 0


    // private weapon:Weapon

    constructor(  x:number, y:number, el:string, g:Game) { 
        super( x, y, el)
        this.game = g
        this.lasergun = new Lasergun(this.getX(), this.getY(), 'lasergun')

        this.drawForeground()
        this.move()

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
    }

    public update():void {

        this.lasergun.update()

        this.setX( this.getX() + this.xspeed )
        this.setY( this.getY() + this.yspeed )

        // Player needs to stay in the screen
        if( this.getX() >= window.innerWidth - 124 || 
            this.getX() <= 0 ||
            this.getY() <= 0 ||
            this.getY() >= window.innerHeight - 135 ) {
                this.yspeed = 0
                this.xspeed = 0
        } else {
            this.move()
        }
    
    }


    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 39:
                this.xspeed = 5
                break
            case 37:
                this.xspeed = -5
                break
            case 38:
                this.yspeed = -5
                break
            case 40:
                this.yspeed = 5
                break
            case 32:
                this.lasergun.shoot(this.getX(), this.getY())
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