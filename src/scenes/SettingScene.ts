import { SCENE } from '../const/const'
import Music from '../objects/Music'
import Button from '../objects/component/Button'

export default class SettingScene extends Phaser.Scene {
    public constructor() {
        super({
            key: SCENE.SETTING,
        })
    }

    public create(): void {
        const centerX = this.sys.canvas.width / 2
        const centerY = this.sys.canvas.height / 2

        this.add.rectangle(0, 0, 2 * centerX, 2 * centerY, 0x123456).setOrigin(0, 0)

        this.add.bitmapText(centerX, centerY - 200, 'font', 'SETTING', 100).setOrigin(0.5, 0.5)

        const text = this.add
            .text(centerX, centerY, `${Math.floor(Music.getVolume() * 100)}`, {
                fontFamily: 'Cambria',
                fontSize: 50,
                fontStyle: 'bold',
            })
            .setOrigin(0.5, 0.5)

        new Button({
            scene: this,
            x: centerX - 100,
            y: centerY,
            width: 75,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('-')
            .setTextSize(100)
            .setFunction(() => {
                Music.setVolume(Music.getVolume() - 0.01)
                text.setText(`${Math.floor(Music.getVolume() * 100)}`)
            })

        new Button({
            scene: this,
            x: centerX + 100,
            y: centerY,
            width: 75,
            height: 75,
            color: 0x00a86b,
            hoverColor: 0x2e8b57,
        })
            .setOrigin(0.5, 0.5)
            .setContent('+')
            .setTextSize(100)
            .setFunction(() => {
                Music.setVolume(Music.getVolume() + 0.01)
                text.setText(`${Math.floor(Music.getVolume() * 100)}`)
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
                this.scene.start(SCENE.MENU)
            })
    }
}
