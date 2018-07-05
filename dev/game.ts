class Game implements Subject {
    private static instance:Game
    // private textfield:HTMLElement
    private player:Player
    private enemy: Enemy
    private powerUp:PowerUp
    private laserPack: LasergunPack
    private doubleLasergun: DoubleLasergun
    private gameObject : GameObject
    public el:HTMLElement
    public paused:Boolean = false


    public observers: Observer[] = []
    // private enemy:Enemy

     private enemys: Enemy[] = []


    //array met gameobjecten
    public GameObjects:GameObject[] = []


    private constructor() {
        // this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        
        this.player = new Player ( window.innerWidth/2, (window.innerHeight - 135), "player", this)
        
       
        this.enemys.push (new Enemy(0, window.innerWidth))
        this.enemys.push ( new Enemy(0, window.innerWidth))
        this.enemys.push (new Enemy(0, window.innerWidth))
        // this.observers.push(this.enemys)
        // this.subscribe(Enemy)
        this.subscribe(this.enemys)
       
        this.powerUp    = new PowerUp(this.player)

        //making powerUps and loading them into the game map
        this.powerUp.makePowerUp(400,700 ,"lasergun")
        this.powerUp.makePowerUp(200, 700, 'doublelasergun')


        console.log(this.powerUp.powerUps)
        console.log(this.enemys)
        
        //Starting the gameloop
        this.gameLoop()
        
    }

    //Singleton
    public static getInstance() {
        if(!Game.instance){
            Game.instance = new Game()
        }

        return Game.instance
    }

    //Subject function of the observer pattern
    public subscribe (o: Observer):void {
        this.observers.push(o)
    }


    //Subject function of the observer pattern
    public unsubscribe(o:Observer):void {
        for (let i = 0; i < this.observers.length; i ++) {
            if(this.observers[i] == o) {
                this.observers.splice(i,1)
            }
        }
    }

      //collision checker
      checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    //Gameloop function
    private gameLoop():void {
        this.player.update()
        this.playerCollision()
        this.checkCollisionLaser()
        this.powerUpCollision()
        // console.log(this.observers)
       
        //update every enemy in enemys array
        for (let i=0, len = this.enemys.length; i < len; i++){
            this.enemys[i].update()
        }

        //updating every gameobject in gameobjects array
        for (let i=0, len = this.GameObjects.length; i < len; i++) {
            this.GameObjects[i].update()
        }

        requestAnimationFrame(() => this.gameLoop())
    }


    // Player collision with Enemy
    private playerCollision():void {
        
        let playerRect  = this.player.getRectangle()
        
        for (let i = 0, len = this.enemys.length; i < len; i++) {
        
            if(this.enemys[i]) {
        
                if(this.checkCollision(playerRect, this.enemys[i].getRectangle())) {
                    console.log("collision enemy and player")
                    }
                }

            }
        }

        //TODO: Hier gaat iets fout met de enemies.
        //Collision enemy with Laser
        private checkCollisionLaser():void {
        
            
            let lasergunRect  = this.player.weaponBehaviour.getRectangle()

            for (let i = 0, len = this.enemys.length; i < len; i++) {
            
                if(this.enemys[i]) {
                    if(this.checkCollision(lasergunRect, this.enemys[i].getRectangle())) {
                    this.player.weaponBehaviour.removeBullet()
                    this.enemys[i].notify()
                    //TODO: hier gaat iets fout denk ik
                    this.enemys.splice(i,1)
                    console.log("Laser hits enemy")
                    } else {
                    // console.log("do nothing")
                    }
                }
            }

            
            //TODO: Enemy doesn't recognize the weponbehaviour class
            // let enemylaser = this.enemy.weaponBehaviour.getRectangle()
            // if(this.checkCollision(enemylaser, this.player.getRectangle())) {
            //     this.enemy.weaponBehaviour.removeBullet()
            //     console.log("bullet hits enemy")
    // }
       

        }

        //Collision with the powerups and the player
        private powerUpCollision(): void {
            let powerUps = this.powerUp.powerUps
            let playerRect = this.player.getRectangle()
    
            for(let i = 0, len = powerUps.length; i < len; i++) {
    
                let powerRect = powerUps[i].getRectangle()
    
                if(this.checkCollision(powerRect, playerRect)) {
                    powerUps[i].removeForeground()
                    this.player.weaponBehaviour.removeBullet()
                    console.log(powerUps)
                    console.log("laserpack collision with player")
                    powerUps[i].switchWeapon()
                }
    
            }
        }

    }


   
//Singleton
window.addEventListener("load", () => {
    Game.getInstance()
})
