class Enemy extends EnemyMovement implements Observer{

    private powerUp:PowerUp
    private player: Player
    private game:Game

    constructor(a:number, b:number){
        super( a, b)
        this.behaviour = new Floating (this)
        this.powerUp    = new PowerUp(this.player)

    }
    
    public update(): void {
        this.behaviour.update()
    }

    // public removeEnemy() {
    //     this.removeForeground()

    // }

    public notify() : void {
        this.removeForeground()
        
        // this.powerUp.makePowerUp(200, 700, 'doublelasergun')
        console.log("enemy is removed")
    }
  
}
    

