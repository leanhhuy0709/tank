import { Bullet } from './Bullet'
import { IImageConstructor } from '../interfaces/image.interface'
import { SCENE } from '../const/const'
import GameScene from '../scenes/GameScene'
import Music from './Music'

export class Player extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body

    // variables
    private health: number
    private lastShoot: number
    private speed: number

    // children
    private barrel: Phaser.GameObjects.Image
    private lifeBar: Phaser.GameObjects.Graphics

    // game objects
    private bullets: Phaser.GameObjects.Group

    // input
    private upKey: Phaser.Input.Keyboard.Key
    private downKey: Phaser.Input.Keyboard.Key
    private leftKey: Phaser.Input.Keyboard.Key
    private rightKey: Phaser.Input.Keyboard.Key
    private isMouseDown: boolean

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    public constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initImage()
        this.scene.add.existing(this)

        this.scene.input.on(
            'pointerdown',
            () => {
                this.isMouseDown = true
            },
            this
        )
        this.scene.input.on(
            'pointerup',
            () => {
                this.isMouseDown = false
            },
            this
        )
        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            this.rotateBarrel(pointer.worldX, pointer.worldY)
        })
    }

    private initImage() {
        // variables
        this.health = 1
        this.lastShoot = 0
        this.speed = 150

        // image
        this.setOrigin(0.5, 0.5)
        this.setDepth(0)
        this.angle = 180

        this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)
        this.barrel.angle = 180

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // input

        if (this.scene.input.keyboard) {
            this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
            this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
            this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
            this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        } else console.log('No input keyboard!!!!!!!!!')

        // physics
        this.scene.physics.world.enable(this)
    }

    public update(): void {
        if (this.active) {
            this.barrel.x = this.x
            this.barrel.y = this.y
            this.lifeBar.x = this.x
            this.lifeBar.y = this.y
            this.handleInput()
            this.handleShooting()
        } else {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    private handleInput() {
        // move tank forward
        // small corrections with (- MATH.PI / 2) to align tank correctly

        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.speed,
            this.body.velocity
        )

        let isInput = false

        // rotate tank
        if (this.upKey.isDown && this.leftKey.isDown) {
            this.rotateToRotation(-Math.PI / 4)
            isInput = true
        } else if (this.upKey.isDown && this.rightKey.isDown) {
            this.rotateToRotation(Math.PI / 4)
            isInput = true
        } else if (this.downKey.isDown && this.leftKey.isDown) {
            this.rotateToRotation((-3 * Math.PI) / 4)
            isInput = true
        } else if (this.downKey.isDown && this.rightKey.isDown) {
            this.rotateToRotation((3 * Math.PI) / 4)
            isInput = true
        } else if (this.upKey.isDown) {
            this.rotateToRotation(0)
            isInput = true
        } else if (this.downKey.isDown) {
            this.rotateToRotation(Math.PI)
            isInput = true
        } else if (this.leftKey.isDown) {
            this.rotateToRotation(-Math.PI / 2)
            isInput = true
        } else if (this.rightKey.isDown) {
            this.rotateToRotation(Math.PI / 2)
            isInput = true
        }

        if (!isInput) {
            this.body.setVelocity(0, 0)
        }
    }

    private rotateBarrel(x: number, y: number): void {
        const rotation = Phaser.Math.Angle.Between(this.x, this.y, x, y) + Math.PI / 2
        const ROTATE_VALUE = 0.1
        let rot = this.barrel.rotation

        if (Math.abs(rot - rotation) > Math.abs(rot - rotation + Math.PI * 2)) rot += Math.PI * 2
        if (Math.abs(rot - rotation) > Math.abs(rot - rotation - Math.PI * 2)) rot -= Math.PI * 2

        if (Math.abs(rot - rotation) < ROTATE_VALUE) {
            rot = rotation
            this.barrel.rotation = rot
        } else if (rot > rotation) rot -= ROTATE_VALUE
        else if (rot < rotation) rot += ROTATE_VALUE
        this.barrel.rotation = rot
    }

    private rotateToRotation(rotation: number): boolean {
        const ROTATE_VALUE = 0.1

        let rot = this.rotation

        if (Math.abs(rot - rotation) > Math.abs(rot - rotation + Math.PI * 2)) rot += Math.PI * 2
        if (Math.abs(rot - rotation) > Math.abs(rot - rotation - Math.PI * 2)) rot -= Math.PI * 2

        if (Math.abs(rot - rotation) < ROTATE_VALUE) {
            rot = rotation
            this.rotation = rot
            return true
        } else if (rot > rotation) rot -= ROTATE_VALUE
        else if (rot < rotation) rot += ROTATE_VALUE

        this.rotation = rot

        return false
    }

    private handleShooting(): void {
        if (this.isMouseDown && this.scene.time.now > this.lastShoot) {
            this.scene.cameras.main.shake(20, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: 'Power1',
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false,
            })

            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletBlue',
                    })
                )

                Music.shootSfx.play()

                this.lastShoot = this.scene.time.now + 80
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health, 15)
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05
            this.redrawLifebar()
            Music.hitSfx.play()
        } else {
            this.health = 0
            this.active = false
            const gameScene = this.scene as GameScene
            gameScene.score.updateHealth(this.health)

            /*
            const graphics = gameScene.add.graphics()
            graphics.fillStyle(0xffffff) // Màu sắc của hình tròn (trắng)
            graphics.beginPath()
            graphics.arc(100, 100, 100, 0, Math.PI * 2)
            graphics.closePath()
            graphics.fill()

            // Tạo mask từ hình tròn với GeometryMask
            const mask = new Phaser.Display.Masks.GeometryMask(gameScene, graphics)

            // Áp dụng mask cho sprite
            gameScene.layer.setMask(mask)
            */

            this.scene.scene.start(SCENE.GAMEOVER, { score: gameScene.score })
        }
    }

    public getHealth(): number {
        return this.health
    }

    public addHealth(): void {
        this.health += 0.2
        if (this.health > 1) this.health = 1
        this.redrawLifebar()
    }
}
