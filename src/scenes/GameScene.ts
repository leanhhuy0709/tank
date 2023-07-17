import { Player } from '../objects/Player'
import { Enemy } from '../objects/Enemy'
import { Obstacle } from '../objects/obstacles/Obstacle'
import { SCENE } from '../const/const'

export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private target: Phaser.Math.Vector2

    public constructor() {
        super({
            key: SCENE.GAME,
        })
    }

    public init(): void {
        //
    }

    public create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })

        this.tileset = this.map.addTilesetImage('tiles') as Phaser.Tilemaps.Tileset
        this.layer = this.map.createLayer(
            'tileLayer',
            this.tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer
        this.layer.setCollisionByProperty({ collide: true })

        this.obstacles = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true,
        })

        this.enemies = this.add.group({
            /*classType: Enemy*/
        })
        this.convertObjects()

        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer)
        this.physics.add.collider(this.player, this.obstacles)

        // collider for bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.layer,
            this.bulletHitLayer,
            undefined,
            this
        )

        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles,
            undefined,
            this
        )

        this.enemies.children.each((_enemy: Phaser.GameObjects.GameObject) => {
            const enemy = _enemy as Enemy

            this.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                this.playerBulletHitEnemy,
                undefined,
                this
            )
            this.physics.add.overlap(
                enemy.getBullets(),
                this.player,
                this.enemyBulletHitPlayer,
                undefined
            )

            this.physics.add.collider(
                enemy.getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                undefined
            )
            this.physics.add.collider(
                enemy.getBullets(),
                this.layer,
                this.bulletHitLayer,
                undefined
            )

            return null
        }, this)

        this.cameras.main.startFollow(this.player)
    }

    public update(): void {
        this.player.update()

        this.enemies.children.each((_enemy: Phaser.GameObjects.GameObject) => {
            const enemy = _enemy as Enemy
            enemy.update()
            if (this.player.active && enemy.active) {
                const angle = Phaser.Math.Angle.Between(
                    enemy.body.x,
                    enemy.body.y,
                    this.player.body.x,
                    this.player.body.y
                )

                enemy.getBarrel().angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
            }

            return null
        }, this)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'

        const tmp = this.map.getObjectLayer('objects')

        if (!tmp) return

        const objects = tmp.objects as Array<{ type: string; x: number; y: number }>

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue',
                })
            } else if (object.type === 'enemy') {
                const enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed',
                })

                this.enemies.add(enemy)
            } else {
                const obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type,
                })

                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer(
        bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ): void {
        bullet.destroy()
    }

    private bulletHitObstacles(
        bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
        _obstacle: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ): void {
        bullet.destroy()
    }

    private enemyBulletHitPlayer(
        bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
        player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ): void {
        bullet.destroy()
        const p = player as Player
        p.updateHealth()
    }

    private playerBulletHitEnemy(
        bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
        enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ): void {
        bullet.destroy()
        const e = enemy as Enemy
        e.updateHealth()
    }
}
