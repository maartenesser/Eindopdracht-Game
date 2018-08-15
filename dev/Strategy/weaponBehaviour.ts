interface WeaponBehaviour {

    speed: number
    bullets: number
    shoot(x: number, y: number): void
    update(): void
    removeBullet(): void
    getRectangle(): ClientRect

}