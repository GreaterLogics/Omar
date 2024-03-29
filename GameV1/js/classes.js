class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }

    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }

    animateFrames() {
      this.framesElapsed++

      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }

    update() {
      this.draw()
      this.animateFrames()
    }
  }

  class Fighter extends Sprite {
    constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites,
      hitBox = { offset: {}, width: undefined, height: undefined }
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset
      })

      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey
      this.hitBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: hitBox.offset,
        width: hitBox.width,
        height: hitBox.height
      }
      this.color = color
      this.isAttacking
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.sprites = sprites
      this.dead = false

      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }


    update() {
        this.draw(); // Trigger the drawing process
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y; // Update the position

        if (this.position.y + this.height + this.velocity.y >= canvas.height-72) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity; // Stopping gravity at the bottom of the screen
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
