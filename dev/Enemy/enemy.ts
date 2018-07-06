class Enemy extends EnemyMovement implements Observer{

    private powerUp:PowerUp
    private player: Player
    private game:Game

    public weaponBehaviour: WeaponBehaviour

    private lasers: WeaponBehaviour[] = []


    constructor(a:number, b:number){
        super( a, b)
        this.behaviour = new Floating (this)
        this.setWeaponBehaviour (new Lasergun(this.getX(), this.getY(), 'lasergun', -10))
        // this.shoot()
        // this.powerUp    = new PowerUp(this.player)
        setInterval(() => this.shoot(), 2000);
    }
    public setWeaponBehaviour(w:WeaponBehaviour) {
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
    public notify() : void {
        this.removeForeground()
        delete(this.weaponBehaviour)
        // this.powerUp.makePowerUp(200, 700, 'doublelasergun')
        console.log("enemy is removed")
    }
  
}
    

