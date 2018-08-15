class DoubleLasergunPack extends GameObject {
    player: Player

    constructor(x: number, y: number, el: string, p: Player) {
        super(x, y, el)
        this.player = p

        super.move()
        super.drawForeground()
    }

    public switchWeapon(): void {
        this.player.setWeaponBehaviour(new DoubleLasergun(0, 0, "doublelasergun"))
    }
}