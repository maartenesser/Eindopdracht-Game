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
Open index.html in `localhost`

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

## UML | Klassendiagram (niet vergeten)

## Game moet live staan op een webpage staan (Niet vergeten)
- Eigen server of kijken of het op een game platform geupload kan worden.

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
Ik heb polymorphisme op de volgende twee plekken gebruikt. Als eerst heb ik polymorfisme toegepast in mijn GameObject. Dit is een class waar ik een blaudruk heb gemaakt wat de basis is van elke game component wat ik in de game laad. Zo kan ik verschillende componenten maken die de zelfde game Object class erven maar dan toch nog van elkaar verschillen. De gameobject class word door de volgende classes gebruikt: Player, Weapons.

// Polymorfisme afmaken

## Strategy




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

