/// <reference path="./gameObject.ts" />


class Bullet extends GameObject {
    private speed : number = 10
    private speedx: number = 0
    private speedy: number = 0

    constructor(x:number, y:number, el:string) {
        super(x,y,el)

        this.speedx = this.speed
        this.speedy = this.speed
    }

    public update () :void {
        this.x += this.speedx
        this.y += this.speedy

        console.log("Update bullet is working")
    }


}