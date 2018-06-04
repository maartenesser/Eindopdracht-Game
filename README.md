# Typescript startproject

Dit is een leeg startproject voor de oefeningen in CMTTHE01-4 en PRG01-8. 

## Het project

- De **docs** map bevat de client side:html en css. De js file wordt hier automatisch in gezet door de compiler.
- De **dev** map bevat de typescript files.
- **game.ts** is het startpunt van de app. Hierin staat de window listener die een `new Game()` maakt.

## Compileren
- Druk op CMD+SHIFT+B en kies voor `watch mode`. Je `.ts` files worden nu samengevoegd in `main.js`.
- tsconfig.json bevat instellingen voor het compileren.

## Bekijken
Open index.html in `localhost`

## Game uitleg (niet vergeten)
- Installatie uitleg over het spel

- Controles vna het spel uitleggen

## UML | Klassendiagram (niet vergeten)

## Game moet live staan op een webpage staan (Niet vergeten)
- Eigen server of kijken of het op een game platform geupload kan worden.

## Pull request
Added a singleton pattern for the game to make sure that there is only one instance of the game.
Added a strategy pattern for weapons to make sure that the player could have more than one weapon arrow.
Made some minor corrections in the style css.

TODO: Minor changes to make strategy pattern complete.

Link pull request: https://github.com/lennartbank/prt01-8-eindopdracht/pull/1
Link veranderingen pull request: https://github.com/lennartbank/prt01-8-eindopdracht/commit/ac524ebb13e08c87cc6502d4991ad301e7b889e7

