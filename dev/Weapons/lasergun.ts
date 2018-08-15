
class Lasergun extends GameObject implements WeaponBehaviour {

    speed: number
    bullets: number


    constructor(x: number, y: number, el: string, s: number) {
        super(x, y, el)

        this.bullets = 0
        this.speed = s

    }

    shoot(x: number, y: number): void {
        this.bullets++
        this.setX(x + 58)
        this.setY(y)
        super.drawForeground()
    }

    removeBullet(): void {
        if (this.bullets >= 1) {
            super.removeForeground()
        }

        this.bullets = 0
    }

    public update(): void {
        this.setY(this.getY() - this.speed)
        this.move()
    }


}