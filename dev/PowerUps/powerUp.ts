class PowerUp {
    private player: Player
    public powerUps: PowerUpBehavior[] = []

    constructor(p: Player) {
        this.player = p
    }

    public makePowerUp(x: number, y: number, type: string): void {

        let powerUpHeight = 150

        switch (type) {
            case 'lasergun':
                let lasergunPack = new LasergunPack(x, y, "lasergunPack", this.player)
                this.powerUps.push(lasergunPack)
                break
            case 'doublelasergun':
                let doubleLasergunPack = new DoubleLasergunPack(x, (window.innerHeight - powerUpHeight), "doubleLasergunPack", this.player)
                this.powerUps.push(doubleLasergunPack)
                break
        }

    }
}