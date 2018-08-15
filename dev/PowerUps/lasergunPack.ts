class LasergunPack extends GameObject {
    private player: Player

    constructor(x: number, y: number, el: string, p: Player) {
        super(x, y, el)
        this.player = p

        super.move()
        super.drawForeground()
    }

    public switchWeapon(): void {
        this.player.setWeaponBehaviour(new Lasergun(0, 0, "lasergun", 10))
    }
}