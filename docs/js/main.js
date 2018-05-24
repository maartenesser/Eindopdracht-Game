"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y, el) {
        this.x = x;
        this.y = y;
        this.el = document.createElement(el);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.el);
    }
    GameObject.prototype.move = function () {
        this.el.style.transform = "translate(" + (this.x) + "px, " + this.y + "px)";
    };
    GameObject.prototype.getX = function () {
        return this.x;
    };
    GameObject.prototype.getY = function () {
        return this.y;
    };
    GameObject.prototype.setX = function (x) {
        this.x = x;
    };
    GameObject.prototype.setY = function (y) {
        this.y = y;
    };
    return GameObject;
}());
var Game = (function () {
    function Game() {
        this.player = new Player(window.innerWidth / 2, (window.innerHeight - 135), "player", this);
        this.enemy = new Enemy(0, 0, "enemy", this);
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.update();
        this.enemy.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y, el, g) {
        var _this = _super.call(this, x, y, el) || this;
        _this.speed = 0;
        _this.game = g;
        return _this;
    }
    Enemy.prototype.update = function () {
        this.setX(this.getX() + this.speed);
        this.move();
        if (this.getX() > window.innerWidth) {
            this.setX(Math.floor(Math.random() * -1000 + -300));
        }
    };
    return Enemy;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, el, g) {
        var _this = _super.call(this, x, y, el) || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.game = g;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.update = function () {
        this.setX(this.getX() + this.xspeed);
        this.setY(this.getY() + this.yspeed);
        this.move();
        if (this.getX() > window.innerWidth) {
            this.setX(Math.floor(Math.random() * -1000 + -300));
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                this.xspeed = 10;
                break;
            case 37:
                this.xspeed = -10;
                break;
            case 38:
                this.yspeed = -10;
                break;
            case 40:
                this.yspeed = 10;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 39:
                this.xspeed = 0;
                break;
            case 37:
                this.xspeed = 0;
                break;
            case 38:
                this.yspeed = 0;
                break;
            case 40:
                this.yspeed = 0;
                break;
        }
    };
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map