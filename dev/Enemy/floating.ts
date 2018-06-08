class Floating implements Movement {
    
    enemyMovement:EnemyMovement
    constructor(em: EnemyMovement) {
        this.enemyMovement = em
    }

    public update() : void {
        if (this.enemyMovement.x < this.enemyMovement.minWidth)
        {
            this.enemyMovement.x = this.enemyMovement.minWidth
            this.enemyMovement.speedX *= -1
        }
        if(this.enemyMovement.x > this.enemyMovement.maxWidth) {
            this.enemyMovement.x = this.enemyMovement.maxWidth
            this.enemyMovement.speedX *= -1
        }
        if (this.enemyMovement.y + this.enemyMovement.speedY > this.enemyMovement.maxHeight)
        {
            this.enemyMovement.y = this.enemyMovement.maxHeight;
            this.enemyMovement.speedY *= -1
        }
        if(this.enemyMovement.y + this.enemyMovement.speedY < this.enemyMovement.minHeight)
        {
            this.enemyMovement.y = this.enemyMovement.minHeight;
            this.enemyMovement.speedY *= -1
        }
        


        this.enemyMovement.x += this.enemyMovement.speedX
        this.enemyMovement.y += this.enemyMovement.speedY
        
        this.enemyMovement.draw()
    }
}