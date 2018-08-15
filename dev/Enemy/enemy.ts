class Enemy extends EnemyMovement implements Observer {

    public weaponBehaviour: WeaponBehaviour

    constructor(a: number, b: number) {
        super(a, b)
        this.behaviour = new Floating(this)
        this.setWeaponBehaviour(new Lasergun(this.getX(), this.getY(), 'lasergun', -10))
        setInterval(() => this.shoot(), 2000);
    }
    public setWeaponBehaviour(w: WeaponBehaviour) {
        this.weaponBehaviour = w
    }

    public update(): void {
        this.behaviour.update()
        this.weaponBehaviour.update()
    }

    public shoot() {
        this.weaponBehaviour.shoot(this.getX(), this.getY())
    }

    //Notify function that is implemented by the observer class
    public notify(): void {
        this.removeForeground()
        delete (this.weaponBehaviour)
        console.log("enemy is removed")
    }

}


