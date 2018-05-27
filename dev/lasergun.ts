/// <reference path="./gameObject.ts" />
/// <reference path="./game.ts" />

class Lasergun extends GameObject {
    
    private yspeed:number = 0


    constructor(x:number, y:number, el:string){
        super( x, y, el)
        // this.game = g
        
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
    }

    public update():void {

        this.setY( this.getY() + this.yspeed )
        this.move()
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 32:
                this.yspeed = 10
                break
            }
    }

}