class Game {
    private static instance:Game
    // private textfield:HTMLElement
    private player:Player
    private enemy: Enemy


    private constructor() {
        // this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        
        this.player = new Player (window.innerWidth/2, (window.innerHeight - 135), "player", this)
        this.enemy = new Enemy (0,0, "enemy", this)
        this.gameLoop()
    }

    public static getInstance() {
        if(!Game.instance){
            Game.instance = new Game()
        }

        return Game.instance
    }

    private gameLoop():void {
        this.player.update()
        this.enemy.update()

        requestAnimationFrame(() => this.gameLoop())
    }
   
}

window.addEventListener("load", () => {
    Game.getInstance()
})
