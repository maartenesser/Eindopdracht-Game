abstract class EnemyMovement {
    
    public behaviour: Movement

    public htmlElement : HTMLElement

    public x           : number = 0
    public y           : number = 0
    public speedX      : number = 5
    public speedY      : number = 2
    public minWidth    : number = 0
    public maxWidth    : number = 0
    public maxHeight   : number = 0
    public minHeight   : number = 0

    constructor(minWidth : number, maxWidth : number, type:string = "enemy") {
        let content = document.getElementsByTagName("content")[0]
        this.htmlElement = document.createElement(type)
        content.appendChild(this.htmlElement)

        maxWidth -= this.htmlElement.clientWidth
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth
        this.y = 100

        this.minWidth   = minWidth
        this.maxWidth   = maxWidth
        this.maxHeight  = 300    - this.htmlElement.clientHeight
        this.minHeight  = 0
    }

    abstract update() : void

    public draw() {
        this.htmlElement.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}