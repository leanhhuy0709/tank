import { Bullet } from './Bullet'
import { IImageConstructor } from '../interfaces/image.interface'
import GameScene from '../scenes/GameScene'
import { SCENE } from '../const/const'

export class Enemy extends Phaser.GameObjects.Image {
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

    public getBarrel(): Phaser.GameObjects.Image {
        return this.barrel
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    public constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initContainer()
        this.scene.add.existing(this)
    }

    private initContainer() {
        // variables
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        // image
        this.setDepth(0)

        this.barrel = this.scene.add.image(0, 0, 'barrelRed')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 3,
            runChildUpdate: true,
        })

        // tweens
        this.scene.tweens.add({
            targets: this,
            props: { y: this.y - 200 },
            delay: 0,
            duration: 2000,
            ease: 'Linear',
            easeParams: null,
            hold: 0,
            repeat: -1,
            repeatDelay: 0,
            yoyo: true,
        })

        // physics
        this.scene.physics.world.enable(this)
    }

    public update(): void {
        if (this.active) {
            this.barrel.x = this.x
            this.barrel.y = this.y
            this.lifeBar.x = this.x
            this.lifeBar.y = this.y
            this.handleShooting()
        } else {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    private handleShooting(): void {
        if (this.scene.time.now > this.lastShoot) {
            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x + this.barrel.height * Math.sin(this.barrel.rotation),
                        y: this.barrel.y - this.barrel.height * Math.cos(this.barrel.rotation),
                        texture: 'bulletRed',
                    })
                )

                this.lastShoot = this.scene.time.now + 400
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
        const gameScene = this.scene as GameScene
        if (this.health > 0) {
            this.health -= 0.05
            this.redrawLifebar()
        } 
        if (this.health <= 0) {
            this.health = 0
            this.active = false
            
            gameScene.score.addNumTankKilled()
            gameScene.player.addHealth()
            gameScene.score.updateHealth(Math.floor(gameScene.player.getHealth() * 100))
            if (gameScene.score.getNumTankKilled() == 7)
            {
                this.scene.scene.start(SCENE.GAMEOVER, { score: gameScene.score, isWin: true })
            }
        }
    }

    public getHealth(): number {
        return this.health
    }

    public rotateBarrel(angle: number): void {
        const ROTATE_SPEED = 0.2

        let val0 = Math.abs(angle - this.barrel.angle)
        if (val0 > 180) val0 = 360 - val0
        if (val0 < ROTATE_SPEED) this.barrel.angle = angle

        let val1 = Math.abs(angle - this.barrel.angle + ROTATE_SPEED)
        if (val1 > 180) val1 = 360 - val1
        let val2 = Math.abs(angle - this.barrel.angle - ROTATE_SPEED)
        if (val2 > 180) val2 = 360 - val2

        if (val1 < val2) this.barrel.angle -= ROTATE_SPEED
        else this.barrel.angle += ROTATE_SPEED
        
    }
}
