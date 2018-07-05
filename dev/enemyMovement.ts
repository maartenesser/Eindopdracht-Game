abstract class EnemyMovement{
    
    public behaviour: Movement

    public el : HTMLElement

    public x           : number = 0
    public y           : number = 0
    public speedX      : number = Math.random() * 8
    public speedY      : number = Math.random()* 8
    public minWidth    : number = 0
    public maxWidth    : number = 0
    public maxHeight   : number = 0
    public minHeight   : number = 0

    constructor(minWidth : number, maxWidth : number, type:string = "enemy") {
        let content = document.getElementsByTagName("foreground")[0]
        this.el = document.createElement(type)
        content.appendChild(this.el)

        maxWidth -= this.el.clientWidth
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth
        this.y = (Math.random() * (this.maxHeight - this.minHeight)) + this.minHeight

        this.minWidth   = minWidth
        this.maxWidth   = maxWidth
        this.maxHeight  = 600    - this.el.clientHeight
        this.minHeight  = 0

    
    }
    
    public getRectangle(){
        return this.el.getBoundingClientRect()
    }

    abstract update() : void

    public move() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public drawForeground():void {
        document.getElementsByTagName("foreground")[0].appendChild(this.el)
    }
    public removeForeground():void {
        document.getElementsByTagName("foreground")[0].removeChild(this.el)
    }
    getX():number {
        return this.x
    }

    getY():number {
        return this.y
    }

    // setX(x:number):void {
    //     this.x = x
    // }

    // setY(y:number):void {
    //     this.y = y
    // }
}