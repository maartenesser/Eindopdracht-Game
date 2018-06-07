interface WeaponBehaviour {

    speed: number
    bullets:number

    shoot(x:number):void
    update():void
    removeBullet():void
    getRectangle():void

}