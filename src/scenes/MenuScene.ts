import { SCENE } from '../const/const'
import Button from '../objects/component/Button'

export default class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

    public constructor() {
        super({
            key: SCENE.MENU,
        })
    }

    public init(): void {
        if (this.input.keyboard)
            this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        else console.log('No input keyboard!!!')
        this.startKey.isDown = false
    }

    public create(): void {
        const centerX = this.sys.canvas.width / 2
        const centerY = this.sys.canvas.height / 2

        this.add.rectangle(0, 0, 2 * centerX, 2 * centerY, 0x123456).setOrigin(0, 0)

        this.bitmapTexts.push(
            this.add
                .bitmapText(
                    this.sys.canvas.width / 2,
                    this.sys.canvas.height / 2 - 200,
                    'font',
                    'TANK',
                    100
                )
                .setOrigin(0.5, 0.5)
        )

        new Button({
            scene: this,
            x: centerX,
            y: centerY - 100,
            width: 200,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('Start')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.transition({
                    target: SCENE.GAME,
                    duration: 500,
                    moveBelow: true,
                    onUpdate: (progress: number) => {
                        this.cameras.main.scrollX = 2 * centerX * progress
                    },
                })

                //this.scene.start(SCENE.GAME)
            })

        new Button({
            scene: this,
            x: centerX,
            y: centerY,
            width: 200,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('Setting')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.start(SCENE.GAME)
            })

        new Button({
            scene: this,
            x: centerX,
            y: centerY + 100,
            width: 200,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('Exit')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.start(SCENE.GAME)
            })
    }

    public update(): void {
        if (this.startKey.isDown) {
            this.scene.start(SCENE.GAME)
        }
    }
}
