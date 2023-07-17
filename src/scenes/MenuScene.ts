import { SCENE } from "../const/const"

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
        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 120,
                this.sys.canvas.height / 2,
                'font',
                'PRESS S TO PLAY',
                30
            )
        )

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 120,
                this.sys.canvas.height / 2 - 100,
                'font',
                'TANK',
                100
            )
        )
    }

    public update(): void {
        if (this.startKey.isDown) {
            this.scene.start(SCENE.GAME)
        }
    }
}
