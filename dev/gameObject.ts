class GameObject {

    private x:number
    private y:number
    private el:HTMLElement

    
    constructor( x:number, y:number, el:string) {

        this.x = x
        this.y = y

        this.el = document.createElement(el)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.el)
    }

    public getRectangle(){
        return this.el.getBoundingClientRect()
    }

    move():void {
        this.el.style.transform = `translate(${(this.x)}px, ${this.y}px)`
    }

    getX():number {
        return this.x
    }

    getY():number {
        return this.y
    }

    setX(x:number):void {
        this.x = x
    }

    setY(y:number):void {
        this.y = y
    }

}