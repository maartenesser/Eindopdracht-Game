class CollisionDetection {
    
    private player:Player
    private game: Game

    constructor (g:Game, p: Player) {
        this.player = p
        this.game = g
    }

    public update () {

        this.shootCollision()
        this.playerCollision()
    }

    private shootCollision() {
        // let bulletRect = this.player
    }


    private playerCollision() {
        let pl
    }

}