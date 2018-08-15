class GameObject {

    public x: number
    public y: number
    public el: HTMLElement



    constructor(x: number, y: number, el: string) {

        this.x = x
        this.y = y

        this.el = document.createElement(el)
        this.move()
    }

    public update(): void {

    }

    public getRectangle() {
        return this.el.getBoundingClientRect()
    }

    move(): void {
        this.el.style.transform = `translate(${(this.x)}px, ${this.y}px)`
    }

    drawForeground() {
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.el)
    }

    removeForeground() {
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.removeChild(this.el)
    }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    setX(x: number): void {
        this.x = x
    }

    setY(y: number): void {
        this.y = y
    }
    public getEL(): HTMLElement {
        return this.el
    }

}