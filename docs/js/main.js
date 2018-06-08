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
        this.move();
    }
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
    };
    return CollisionDetection;
}());
var EnemyMovement = (function () {
    function EnemyMovement(minWidth, maxWidth, type) {
        if (type === void 0) { type = "enemy"; }
        this.x = 0;
        this.y = 0;
        this.speedX = 5;
        this.speedY = 2;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.minHeight = 0;
        var content = document.getElementsByTagName("content")[0];
        this.htmlElement = document.createElement(type);
        content.appendChild(this.htmlElement);
        maxWidth -= this.htmlElement.clientWidth;
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth;
        this.y = 100;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.maxHeight = 300 - this.htmlElement.clientHeight;
        this.minHeight = 0;
    }
    EnemyMovement.prototype.draw = function () {
        this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return EnemyMovement;
}());
var Game = (function () {
    function Game() {
        this.enemys = [];
        this.GameObjects = [];
        this.player = new Player(window.innerWidth / 2, (window.innerHeight - 135), "player", this);
        this.enemys.push(new Enemy(0, window.innerWidth));
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
        for (var _i = 0, _a = this.enemys; _i < _a.length; _i++) {
            var enemyMovement = _a[_i];
            enemyMovement.update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, el, g) {
        var _this = _super.call(this, x, y, el) || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.game = g;
        _this.setWeaponBehaviour(new DoubleLasergun(_this.getX(), _this.getY(), 'doublelasergun'));
        _this.drawForeground();
        _this.move();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.setWeaponBehaviour = function (w) {
        this.weaponBehaviour = w;
    };
    Player.prototype.update = function () {
        this.weaponBehaviour.update();
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
        _this.behaviour = new Floating(_this);
        return _this;
    }
    Enemy.prototype.update = function () {
        this.behaviour.update();
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
        this.enemyMovement.draw();
    };
    return Floating;
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
        this.drawForeground();
    };
    DoubleLasergun.prototype.removeBullet = function () {
        if (this.bullets >= 1) {
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
    function Lasergun(x, y, el) {
        var _this = _super.call(this, x, y, el) || this;
        _this.bullets = 0;
        _this.speed = 20;
        return _this;
    }
    Lasergun.prototype.shoot = function (x, y) {
        this.bullets++;
        this.setX(x + 58);
        this.setY(y);
        this.drawForeground();
    };
    Lasergun.prototype.removeBullet = function () {
        if (this.bullets >= 1) {
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