## Space invadors

Dit is een game die lijkt op space invators.

## Het project

- De **docs** map bevat de client side:html en css. De js file wordt hier automatisch in gezet door de compiler.
- De **dev** map bevat de typescript files.
- **game.ts** is het startpunt van de app. Hierin staat de window listener die een `new Game()` maakt.

## Compileren
- Druk op CMD+SHIFT+B en kies voor `watch mode`. Je `.ts` files worden nu samengevoegd in `main.js`.
- tsconfig.json bevat instellingen voor het compileren.

## Bekijken
Open index.html in `Browser`

## Game uitleg

Glone de Repository

```
$ git clone https://github.com/maartenesser/Eindopdracht-Game
```

- Met de ```ARROW``` kan je het spaceship bewegen.
- Met de ``` SPACE ``` toets kan je het wapen van het spaceship afvuren.
- Pasop er zijn ook enemy schepen die aanvallen.
- Je hebt drie levens tot je gameover bent.
- Door enemies te doden krijg je punten en upgrades.
- Het doel van het spel is zoveel mogelijk punten te halen.

## UML | Klassendiagram

https://spacenebula.maartensolutions.nl/SpaceNebula.pdf

## Game moet live staan op een webpage staan

Link naar de live game: https://spacenebula.maartensolutions.nl

## Singleton
Space Nebula maakt gebruik van een singleton. Deze wordt aangeroepen in de game class. Hij wordt als volgt opgeslagen als een static field.
```
private static instance:Game
``` 
De Game kan worden opgehaald of aangemaakt door de method _getInstance_ 
```
public static getInstance() {
        if(!Game.instance){
            Game.instance = new Game()
        }

        return Game.instance
    }
```
Waar ik gebruik van maakt in de volgende eventListener in Game.ts:
```
window.addEventListener("load", () => {
    Game.getInstance()
})
```

## Polymorfisme
Ik heb polymorphisme op de volgende twee plekken gebruikt. Als eerst heb ik polymorfisme toegepast in mijn GameObject. Dit is een class waar ik een blaudruk heb gemaakt wat de basis is van elke game component wat ik in de game laad. Zo kan ik verschillende componenten maken die de zelfde game Object class erven maar dan toch nog van elkaar verschillen. De gameobject class word door de volgende classes gebruikt: Player, Lasergun, DoubleLasergun, doubleLasergunPack, lasergunPack.

Bij de LasergunPack class maak ik gebruik van polymorfisme door de gameObject class te extenden.
```
class LasergunPack extends GameObject {
}
```

Om de laserGunPack te maken moet ik eerst de super method aangeroepen worden in de constructor om de `x, y` en `el` in te vullen.

```
super(x, y, el)
```
om de laserGunPack in de game te laten zien gebruik ik deze method die ook van het GameObject afstamt.

```
super.drawForeground()
```
Bij de andere classen: Player, Lasergun, DoubleLasergun, doubleLasergunPack, lasergunPack. wordt ook de `super.drawForeground()` gebruikt. Ze gebruiken allemaal de zelfde super class met de drawforground method maar voor elke class wordt er een ander beeld geladen.

## Strategy Pattern
Hieronder beschrijf ik waar ik het strategy pattern heb toegevoegd. Elk wapen implementeerd de interface WeaponBehaviour.

```
    interface WeaponBehaviour {

    speed: number
    bullets:number
    shoot(x:number, y:number): void
    update():void
    removeBullet():void
    getRectangle():ClientRect

}
```
De Player heeft twee wapens die deel uit maken van het strategy pattern (Weaponbehaviour). Het type waken wordt in de player class bepaald.

```
public myWeaponBehaviour: WeaponBehaviour
        this.setWeaponBehaviour (new Lasergun(this.getX(), this.getY(), 'lasergun', 10))
```
Als het wapen aangepast moet worden kan dit gedaan worden door de setWeaponbehaviour method aan te roepen.

Om van wapen te wisselen moet de player een updrade pack pakken. in deze upgrade packs wordt dan met de switchWeapon method de setWeaponbehaviour aangeroepen om vervolgens het wapen van de player te veranderen.

```
public switchWeapon():void {
        this.player.setWeaponBehaviour(new DoubleLasergun(0,0,"doublelasergun"))
    }
```

Verder maakt de Enemy ook gebruik van de setWeaponBehaviuor. Hier krijgt de enemy ook een laser. In het verloop van het spel is er dus een mogelijkheid om het wapen van de enemy te veranderen. Hierbij gebruik je precies de zelfde methode als hierboven. Alleen moet je wel opletten dat de laser de andere kant moet gaan schieten.

Verder heb ik bij de enemy nog een strategy pattern gebruikt. Hiermee wil ik zijn vlieg gedrag beinvloeden. Het gedrag wordt in de condtructor aangeroepen.

```
        this.behaviour = new Floating (this)

```

Helaas had ik niet genoeg tijd om een ander vlieg gedrag toe te voegen voor de Enemy class.

## Observer Pattern

Het Observer pattern gebruik ik om de enemys te laten verdwijen als de enemy door een bullet van de player geraakt word. Hierbij is de game het Subject die de volgende interface implementeerd.

  ```
  interface Subject {

      observers:Observer[]
      subscribe(o:Observer):void
      unsubscribe(o:Observer):void
      
  }
  ```

De twee methods die in de interface staan beschreven worden gebruikt om de obeservers (enemies) aan te melden en af te melden bij van de observer array (`observers:Observer[]`)

voor het aanmelden wordt deze funktie gebruikt.

  ```
    subscribe(o: Observer): void {
          
          this.observers.push(o)

      }
  ```

voor het afmelden wordt deze functie gebruikt.

  ```
  public unsubscribe(o:Observer):void {
          for (let i = 0; i < this.observers.length; i ++) {
              if(this.observers[i] == o) {
                  this.observers.splice(i,1)
              }
          }
      }

  ```
er is maar een class die de observer interface implementeerd en dat is de enemy class.

```
interface Observer {
    notify():void

}
```

Als de observers zijn aangemeld zal het subject (game) aangeven wanneer de observers een bericht krijgen. Dit gebreurd als volgd.

```
for (let i = 0, len = this.enemys.length; i < len; i++) {
            
                if(this.enemys[i]) {
                    if(this.checkCollision(lasergunRect, this.enemys[i].getRectangle())) {
                    this.enemys[i].notify()
                    } 
                }
```
de Notify word angeroepen en bij de observer (enemy class) uitgevoert. Wat er bij mij gebeurd is dat de notify functie de enemy verwijderd als de enemy geraakt wordt door een laser.


## Gameplay Componenten
//nog beschrijven
## Pull request

### Week 4 pull Request door Lennart Bank bij Space Nebula (Maarten Esser)

#### ReadMe:
``` Deze branch voegt functionaliteit toe om de player in het browser scherm te houden. ```

  Link: https://github.com/maartenesser/Eindopdracht-Game/commit/1a0e7d824a542f5aa78f7af79bffee864fe9d273

### Week 4 Pull request door Maarten Esser van Bubble Trouble (Lennart Bank); 

#### ReadMe:
```
Added a singleton pattern for the game to make sure that there is only one instance of the game.
Added a strategy pattern for weapons to make sure that the player could have more than one weapon arrow.
Made some minor corrections in the style css. 

TODO: Minor changes to make strategy pattern complete. 
```

  Link: https://github.com/lennartbank/prt01-8-eindopdracht/pull/1

## Peer Review


### Week 6 peer review van Lennart Bank voor Space Nebula (Maarten Esser)

  Link: https://github.com/maartenesser/Eindopdracht-Game/issues/3

### Week 6 peer review van Maarten Esser voor Bubble Trouble (Lennart Bank)

  Link: https://github.com/lennartbank/prt01-8-eindopdracht/issues/2

