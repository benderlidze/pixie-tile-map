"use strict"
class Plane extends PIXI.Sprite {

    constructor({ x = 0, y = 0, texture, name = "plane", hp, speed }) {
        super(texture)
        this.anchor.set(0.5)
        this.scale.set(0.4)
        this.name = name
        this.x = x
        this.y = y
        this.speed = speed
        this.hp = hp
    }

    status() { }
    
    moveLeft() {
        if (this.x <= 0) return false;
        this.x -= 7 * this.speed
        console.log('this.x', this.x);
    }

    moveRight() {
        console.log('app', this);
        if (this.x >= 1000) return;
        this.x += 7 * this.speed
    }
}