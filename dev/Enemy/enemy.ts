class Enemy extends EnemyMovement {

    constructor(a:number, b:number){
        super( a, b)
        this.behaviour = new Floating (this)
    }
    
    public update(): void {
        this.behaviour.update()
    }

}
    

