class Game {
    private static instance:Game
    // private textfield:HTMLElement
    private player:Player
    private enemy: Enemy
    private lasergun:Lasergun


    private constructor() {
        // this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        
        this.player = new Player ( window.innerWidth/2, (window.innerHeight - 135), "player", this)
        this.enemy = new Enemy (0,0, "enemy", this)
        this.lasergun = new Lasergun (0,0,"lasergun")
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
        this.enemy.update()
        this.lasergun.update()

        // Check collision between two spaceships
        let hit = this.checkCollision(this.player.getRectangle(), this.enemy.getRectangle())

        requestAnimationFrame(() => this.gameLoop())
    }
   
}

window.addEventListener("load", () => {
    Game.getInstance()
})
