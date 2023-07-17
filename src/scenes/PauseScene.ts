import { SCENE } from '../const/const'

export default class PauseScene extends Phaser.Scene {
    public constructor() {
        super({
            key: SCENE.PAUSE,
        })
    }

    public create(): void {
        const centerX = this.sys.canvas.width / 2
        const centerY = this.sys.canvas.height / 2
        this.add.rectangle(0, 0, 2 * centerX, 2 * centerY, 0x123456, 0.5).setOrigin(0, 0)

        this.add
            .bitmapText(
                centerX,
                centerY,
                'font',
                '||',
                100
            )
            .setOrigin(0.5, 0.5)
    }
}
