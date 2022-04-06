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
        this.planeAnimation;


    }

    init() {
        const left = keyboard("ArrowLeft");
        const right = keyboard("ArrowRight");
        left.press = () => {
            plane.moveLeft()
        };
        left.release = () => {
            plane.cancelMovement()
        };
        right.press = () => {
            plane.moveRight()
        };
        right.release = () => {
            plane.cancelMovement()
        };
    }

    status() { }

    cancelMovement() {
        cancelAnimationFrame(this.planeAnimation)
    }

    moveAnimation(direction) {
        this.planeAnimation = requestAnimationFrame(() => this.moveAnimation(direction))
        if (this.x < 0) {
            this.x = 0
            this.cancelMovement()
            return;
        }
        if (this.x > 1000) {
            this.x = 1000
            this.cancelMovement()
            return;
        }
        this.x = this.x + direction * this.speed
    }

    moveLeft() {
        if (this.x <= 0) return false;
        this.moveAnimation(-1)
    }

    moveRight() {
        if (this.x >= 1000) return;
        this.moveAnimation(+1)
    }
}


function keyboard(value) {
    const key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = (event) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = (event) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}