
class Lasergun extends GameObject {

    speed: number
    bullets:number

    constructor (x:number, y:number, el:string){
        super(x, y, el)

        this.bullets = 0
        this.speed = 20

    }

    shoot (x:number):void {
        if (this.bullets > 0){
            return
        } else {
            this.bullets++
            this.setY(0)
            this.setX(x + 10)
            console.log("shooting methiod is activated")

        }
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
        console.log("update of shoot is working")

    }
   

}