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

## Pull request

# Week 4 pull Request door Lennart Bank bij Space Nebula (Maarten Esser)

# ReadMe:
``` Deze branch voegt functionaliteit toe om de player in het browser scherm te houden. ```

Link: https://github.com/maartenesser/Eindopdracht-Game/commit/1a0e7d824a542f5aa78f7af79bffee864fe9d273

# Week 4 Pull request door Maarten Esser bij Bubble Trouble (Lennart Bank); 

# ReadMe:
```
Added a singleton pattern for the game to make sure that there is only one instance of the game.
Added a strategy pattern for weapons to make sure that the player could have more than one weapon arrow.
Made some minor corrections in the style css. 

TODO: Minor changes to make strategy pattern complete. 
```

Link: https://github.com/lennartbank/prt01-8-eindopdracht/pull/1

