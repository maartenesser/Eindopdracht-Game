
class Lasergun extends GameObject {

    speed: number
    bullets:number

    constructor (x:number, y:number, el:string){
        super(x, y, el)

        this.bullets = 0
        this.speed = 20

    }

    shoot (x:number, y:number):void {
        this.setX(x)
        this.setY(y)
        this.drawForeground()
    }

    removeBullet(): void {
        if (this.bullets >= 1) {
            // Moet nog code komen
        }

        this.bullets = 0
    }  

    public update(): void {
        this.setY(this.getY() - this.speed)
        this.move()
    }
   

}