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
    GameObject.prototype.getRectangle = function () {
        return this.el.getBoundingClientRect();
    };
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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, el) {
        var _this = _super.call(this, x, y, el) || this;
        _this.speed = 10;
        _this.speedx = 0;
        _this.speedy = 0;
        _this.speedx = _this.speed;
        _this.speedy = _this.speed;
        return _this;
    }
    Bullet.prototype.update = function () {
        this.x += this.speedx;
        this.y += this.speedy;
        console.log("Update bullet is working");
    };
    return Bullet;
}(GameObject));
var CollisionDetection = (function () {
    function CollisionDetection(g, p) {
        this.player = p;
        this.game = g;
    }
    CollisionDetection.prototype.update = function () {
        this.shootCollision();
        this.playerCollision();
    };
    CollisionDetection.prototype.shootCollision = function () {
    };
    CollisionDetection.prototype.playerCollision = function () {
        var pl;
    };
    return CollisionDetection;
}());
var Game = (function () {
    function Game() {
        this.GameObjects = [];
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
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.update();
        this.enemy.update();
        var collisionShips = this.checkCollision(this.player.getRectangle(), this.enemy.getRectangle());
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
var Lasergun = (function (_super) {
    __extends(Lasergun, _super);
    function Lasergun(x, y, el) {
        var _this = _super.call(this, x, y, el) || this;
        _this.bullets = 0;
        _this.speed = 20;
        return _this;
    }
    Lasergun.prototype.shoot = function (x) {
        if (this.bullets > 0) {
            return;
        }
        else {
            this.bullets++;
            this.setY(0);
            this.setX(x + 10);
            console.log("shooting methiod is activated");
        }
    };
    Lasergun.prototype.removeBullet = function () {
        if (this.bullets >= 1) {
        }
        this.bullets = 0;
    };
    Lasergun.prototype.update = function () {
        this.setY(this.getY() - this.speed);
        this.move();
        console.log("update of shoot is working");
    };
    return Lasergun;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, el, g, l) {
        var _this = _super.call(this, x, y, el) || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.game = g;
        _this.lasergun = l;
        _this.move();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.update = function () {
        this.setX(this.getX() + this.xspeed);
        this.setY(this.getY() + this.yspeed);
        if (this.getX() >= window.innerWidth - 124 ||
            this.getX() <= 0 ||
            this.getY() <= 0 ||
            this.getY() >= window.innerHeight - 135) {
            this.yspeed = 0;
            this.xspeed = 0;
        }
        else {
            this.move();
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                this.xspeed = 5;
                break;
            case 37:
                this.xspeed = -5;
                break;
            case 38:
                this.yspeed = -5;
                break;
            case 40:
                this.yspeed = 5;
                break;
            case 32:
                console.log("Spacebar is clicked");
                this.lasergun.shoot(this.getX());
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
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Weapon;
}(GameObject));
//# sourceMappingURL=main.js.map