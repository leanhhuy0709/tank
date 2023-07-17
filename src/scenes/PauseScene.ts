import { SCENE } from '../const/const'
import Button from '../objects/component/Button'

export default class PauseScene extends Phaser.Scene {
    public constructor() {
        super({
            key: SCENE.PAUSE,
        })
    }

    public create(): void {
        const centerX = this.sys.canvas.width / 2
        const centerY = this.sys.canvas.height / 2
        this.add.rectangle(0, 0, 2 * centerX, 2 * centerY, 0x000000, 0.5).setOrigin(0, 0)

        this.add.bitmapText(centerX, centerY - 200, 'font', '| |', 100).setOrigin(0.5, 0.5)

        new Button({
            scene: this,
            x: centerX,
            y: centerY - 100,
            width: 250,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('Continue')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.stop(SCENE.PAUSE)
                this.scene.resume(SCENE.GAME)
            })

        new Button({
            scene: this,
            x: centerX,
            y: centerY,
            width: 250,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('Try again')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.start(SCENE.GAME)
            })

        new Button({
            scene: this,
            x: centerX,
            y: centerY + 100,
            width: 250,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('Sound: ON')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.start(SCENE.GAME)
            })

        new Button({
            scene: this,
            x: centerX,
            y: centerY + 200,
            width: 250,
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
}
