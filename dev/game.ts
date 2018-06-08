class Game {
    private static instance:Game
    // private textfield:HTMLElement
    private player:Player
    // private enemy:Enemy

     private enemys: Enemy[] = []

    //array met ameobjecten
    public GameObjects:GameObject[] = []


    private constructor() {
        // this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        
        this.player = new Player ( window.innerWidth/2, (window.innerHeight - 135), "player", this)
        this.enemys.push (new Enemy(0, window.innerWidth))
        // this.enemy = new Enemy (0,0, "enemy", this, 0, 0)
        this.gameLoop()
        
    }

    public static getInstance() {
        if(!Game.instance){
            Game.instance = new Game()
        }

        return Game.instance
    }

      //collision checker
      checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    private gameLoop():void {
        this.player.update()
        // this.enemy.update()
        for (const enemyMovement of this.enemys) {
            enemyMovement.update()
        }

        // Check collision between two spaceships
        // let collisionShips = this.checkCollision(this.player.getRectangle(), this.enemy.getRectangle())
        //let hit = this.checkCollision(this.bullet.getRectangle(), this.enemy.getRectangle())
        // console.log("spaceship hit is " + hit)


        requestAnimationFrame(() => this.gameLoop())
    }
   
}

window.addEventListener("load", () => {
    Game.getInstance()
})
