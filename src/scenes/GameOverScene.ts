import Score from '../Score'
import { SCENE } from '../const/const'
import Music from '../objects/Music'
import Button from '../objects/component/Button'

export default class GameOverScene extends Phaser.Scene {
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []
    private score: Score
    private isWin: boolean

    public constructor() {
        super({
            key: SCENE.GAMEOVER,
        })
    }

    public init(data: { score: Score; isWin?: boolean }): void {
        this.score = data.score
        if (data.isWin) this.isWin = true
        else this.isWin = false
    }

    public create(): void {
        const centerX = this.sys.canvas.width / 2
        const centerY = this.sys.canvas.height / 2

        this.add.rectangle(0, 0, 2 * centerX, 2 * centerY, 0x123456).setOrigin(0, 0)

        this.bitmapTexts.push(
            this.add
                .bitmapText(
                    this.sys.canvas.width / 2,
                    this.sys.canvas.height / 2 - 400,
                    'font',
                    this.isWin ? 'YOU WIN' : 'GAME OVER',
                    100
                )
                .setOrigin(0.5, 0.5)
        )

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
            .setContent('Restart')
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
            .setContent('Setting')
            .setTextSize(50)
            .setFunction(() => {
                this.scene.start(SCENE.SETTING)
            })

        new Button({
            scene: this,
            x: centerX,
            y: centerY + 200,
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

        Music.stop()

        this.score.createScoreBoard(this, centerX, centerY - 200)
    }
}
