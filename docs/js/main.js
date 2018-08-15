"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    };
    return CollisionDetection;
}());
var EnemyMovement = (function () {
    function EnemyMovement(minWidth, maxWidth, type) {
        if (type === void 0) { type = "enemy"; }
        this.x = 0;
        this.y = 0;
        this.speedX = Math.random() * 8;
        this.speedY = Math.random() * 8;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.minHeight = 0;
        var content = document.getElementsByTagName("foreground")[0];
        this.el = document.createElement(type);
        content.appendChild(this.el);
        maxWidth -= this.el.clientWidth;
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth;
        this.y = (Math.random() * (this.maxHeight - this.minHeight)) + this.minHeight;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.maxHeight = 600 - this.el.clientHeight;
        this.minHeight = 0;
    }
    EnemyMovement.prototype.getRectangle = function () {
        return this.el.getBoundingClientRect();
    };
    EnemyMovement.prototype.move = function () {
        this.el.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    EnemyMovement.prototype.drawForeground = function () {
        document.getElementsByTagName("foreground")[0].appendChild(this.el);
    };
    EnemyMovement.prototype.removeForeground = function () {
        document.getElementsByTagName("foreground")[0].removeChild(this.el);
    };
    EnemyMovement.prototype.getX = function () {
        return this.x;
    };
    EnemyMovement.prototype.getY = function () {
        return this.y;
    };
    return EnemyMovement;
}());
var Game = (function () {
    function Game() {
        this.paused = false;
        this.observers = [];
        this.enemys = [];
        this.GameObjects = [];
        this.player = new Player(window.innerWidth / 2, (window.innerHeight - 135), "player", this);
        this.enemys.push(new Enemy(0, window.innerWidth));
        this.enemys.push(new Enemy(0, window.innerWidth));
        this.enemys.push(new Enemy(0, window.innerWidth));
        for (var i = 0; i < this.enemys.length; i++) {
            this.subscribe(this.enemys[i]);
        }
        this.powerUp = new PowerUp(this.player);
        this.powerUp.makePowerUp(400, 700, "lasergun");
        this.powerUp.makePowerUp(200, 700, 'doublelasergun');
        console.log(this.powerUp.powerUps);
        console.log(this.enemys);
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Game.prototype.unsubscribe = function (o) {
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i] == o) {
                this.observers.splice(i, 1);
            }
        }
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
        this.playerCollision();
        this.checkCollisionLaser();
        this.powerUpCollision();
        for (var i = 0, len = this.enemys.length; i < len; i++) {
            this.enemys[i].update();
        }
        for (var i = 0, len = this.GameObjects.length; i < len; i++) {
            this.GameObjects[i].update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.playerCollision = function () {
        var playerRect = this.player.getRectangle();
        for (var i = 0, len = this.enemys.length; i < len; i++) {
            if (this.enemys[i]) {
                if (this.checkCollision(playerRect, this.enemys[i].getRectangle())) {
                    console.log("collision enemy and player");
                }
            }
        }
    };
    Game.prototype.checkCollisionLaser = function () {
        if (this.player.weaponBehaviour) {
            var lasergunRect = this.player.weaponBehaviour.getRectangle();
            for (var i = 0, len = this.enemys.length; i < len; i++) {
                if (this.enemys[i]) {
                    if (this.checkCollision(lasergunRect, this.enemys[i].getRectangle())) {
                        this.player.weaponBehaviour.removeBullet();
                        this.enemys[i].notify();
                        this.enemys.splice(i, 1);
                        console.log("Laser hits enemy");
                    }
                    else {
                    }
                }
            }
        }
    };
    Game.prototype.powerUpCollision = function () {
        var powerUps = this.powerUp.powerUps;
        var playerRect = this.player.getRectangle();
        for (var i = 0, len = powerUps.length; i < len; i++) {
            var powerRect = powerUps[i].getRectangle();
            if (this.checkCollision(powerRect, playerRect)) {
                powerUps[i].removeForeground();
                this.player.weaponBehaviour.removeBullet();
                console.log(powerUps);
                console.log("laserpack collision with player");
                powerUps[i].switchWeapon();
            }
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var GameObject = (function () {
    function GameObject(x, y, el) {
        this.x = x;
        this.y = y;
        this.el = document.createElement(el);
        this.move();
    }
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.getRectangle = function () {
        return this.el.getBoundingClientRect();
    };
    GameObject.prototype.move = function () {
        this.el.style.transform = "translate(" + (this.x) + "px, " + this.y + "px)";
    };
    GameObject.prototype.drawForeground = function () {
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.el);
    };
    GameObject.prototype.removeForeground = function () {
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.removeChild(this.el);
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
    GameObject.prototype.getEL = function () {
        return this.el;
    };
    return GameObject;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, el, g) {
        var _this = _super.call(this, x, y, el) || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.game = g;
        _this.setWeaponBehaviour(new Lasergun(_this.getX(), _this.getY(), 'lasergun', 10));
        _this.drawForeground();
        _this.move();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        _this.game.GameObjects.push(_this);
        return _this;
    }
    Player.prototype.setWeaponBehaviour = function (w) {
        this.weaponBehaviour = w;
    };
    Player.prototype.update = function () {
        if (this.weaponBehaviour) {
            this.weaponBehaviour.update();
        }
        this.setX(this.getX() + this.xspeed);
        this.setY(this.getY() + this.yspeed);
        if (this.getX() >= window.innerWidth - this.el.clientWidth ||
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
                this.weaponBehaviour.shoot(this.getX(), this.getY());
                console.log("pressed space key!");
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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(a, b) {
        var _this = _super.call(this, a, b) || this;
        _this.lasers = [];
        _this.behaviour = new Floating(_this);
        _this.setWeaponBehaviour(new Lasergun(_this.getX(), _this.getY(), 'lasergun', -10));
        setInterval(function () { return _this.shoot(); }, 2000);
        return _this;
    }
    Enemy.prototype.setWeaponBehaviour = function (w) {
        this.weaponBehaviour = w;
    };
    Enemy.prototype.update = function () {
        this.behaviour.update();
        this.weaponBehaviour.update();
    };
    Enemy.prototype.shoot = function () {
        this.weaponBehaviour.shoot(this.getX(), this.getY());
    };
    Enemy.prototype.notify = function () {
        this.removeForeground();
        delete (this.weaponBehaviour);
        console.log("enemy is removed");
    };
    return Enemy;
}(EnemyMovement));
var Floating = (function () {
    function Floating(em) {
        this.enemyMovement = em;
    }
    Floating.prototype.update = function () {
        if (this.enemyMovement.x < this.enemyMovement.minWidth) {
            this.enemyMovement.x = this.enemyMovement.minWidth;
            this.enemyMovement.speedX *= -1;
        }
        if (this.enemyMovement.x > this.enemyMovement.maxWidth) {
            this.enemyMovement.x = this.enemyMovement.maxWidth;
            this.enemyMovement.speedX *= -1;
        }
        if (this.enemyMovement.y + this.enemyMovement.speedY > this.enemyMovement.maxHeight) {
            this.enemyMovement.y = this.enemyMovement.maxHeight;
            this.enemyMovement.speedY *= -1;
        }
        if (this.enemyMovement.y + this.enemyMovement.speedY < this.enemyMovement.minHeight) {
            this.enemyMovement.y = this.enemyMovement.minHeight;
            this.enemyMovement.speedY *= -1;
        }
        this.enemyMovement.x += this.enemyMovement.speedX;
        this.enemyMovement.y += this.enemyMovement.speedY;
        this.enemyMovement.move();
    };
    return Floating;
}());
var DoubleLasergunPack = (function (_super) {
    __extends(DoubleLasergunPack, _super);
    function DoubleLasergunPack(x, y, el, p) {
        var _this = _super.call(this, x, y, el) || this;
        _this.player = p;
        _super.prototype.move.call(_this);
        _super.prototype.drawForeground.call(_this);
        return _this;
    }
    DoubleLasergunPack.prototype.switchWeapon = function () {
        this.player.setWeaponBehaviour(new DoubleLasergun(0, 0, "doublelasergun"));
    };
    return DoubleLasergunPack;
}(GameObject));
var LasergunPack = (function (_super) {
    __extends(LasergunPack, _super);
    function LasergunPack(x, y, el, p) {
        var _this = _super.call(this, x, y, el) || this;
        _this.player = p;
        _super.prototype.move.call(_this);
        _super.prototype.drawForeground.call(_this);
        return _this;
    }
    LasergunPack.prototype.switchWeapon = function () {
        this.player.setWeaponBehaviour(new Lasergun(0, 0, "lasergun", 10));
    };
    return LasergunPack;
}(GameObject));
var PowerUp = (function () {
    function PowerUp(p) {
        this.powerUps = [];
        this.player = p;
    }
    PowerUp.prototype.makePowerUp = function (x, y, type) {
        var powerUpHeight = 150;
        switch (type) {
            case 'lasergun':
                var lasergunPack = new LasergunPack(x, y, "lasergunPack", this.player);
                this.powerUps.push(lasergunPack);
                break;
            case 'doublelasergun':
                var doubleLasergunPack = new DoubleLasergunPack(x, (window.innerHeight - powerUpHeight), "doubleLasergunPack", this.player);
                this.powerUps.push(doubleLasergunPack);
                break;
        }
    };
    return PowerUp;
}());
var DoubleLasergun = (function (_super) {
    __extends(DoubleLasergun, _super);
    function DoubleLasergun(x, y, el) {
        var _this = _super.call(this, x, y, el) || this;
        _this.bullets = 0;
        _this.speed = 20;
        return _this;
    }
    DoubleLasergun.prototype.shoot = function (x, y) {
        this.bullets++;
        this.setX(x + 58);
        this.setY(y);
        _super.prototype.drawForeground.call(this);
    };
    DoubleLasergun.prototype.removeBullet = function () {
        if (this.bullets >= 1) {
            _super.prototype.removeForeground.call(this);
        }
        this.bullets = 0;
    };
    DoubleLasergun.prototype.update = function () {
        this.setY(this.getY() - this.speed);
        this.move();
    };
    return DoubleLasergun;
}(GameObject));
var Lasergun = (function (_super) {
    __extends(Lasergun, _super);
    function Lasergun(x, y, el, s) {
        var _this = _super.call(this, x, y, el) || this;
        _this.bullets = 0;
        _this.speed = s;
        return _this;
    }
    Lasergun.prototype.shoot = function (x, y) {
        this.bullets++;
        this.setX(x + 58);
        this.setY(y);
        _super.prototype.drawForeground.call(this);
    };
    Lasergun.prototype.removeBullet = function () {
        if (this.bullets >= 1) {
            _super.prototype.removeForeground.call(this);
        }
        this.bullets = 0;
    };
    Lasergun.prototype.update = function () {
        this.setY(this.getY() - this.speed);
        this.move();
    };
    return Lasergun;
}(GameObject));
//# sourceMappingURL=main.js.map