
interface PowerUpBehavior {

    player: Player

    switchWeapon(): void
    update(): void
    getRectangle(): ClientRect
    removeForeground(): void

}