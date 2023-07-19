import { IScoreConstructor } from './interfaces/score.interface'

export default class Score {
    private numTankKilled: number
    private health: number
    public constructor(aParams: IScoreConstructor) {
        this.numTankKilled = aParams.numTankKilled
        this.health = aParams.health
    }

    public createScoreBoard(scene: Phaser.Scene, x: number, y: number): void {
        let highScore = Number(localStorage.getItem('highscore'))

        if (!highScore) highScore = 0

        scene.add.rectangle(x, y, 600, 300, 0x76a4ed)
        scene.add
            .text(x, y - 120, 'SCORE BOARD', {
                fontSize: '32px',
                fontFamily: 'Cambria',
                fontStyle: 'bold',
                color: '#000000',
            })
            .setOrigin(0.5, 0.5)
        scene.add
            .text(x - 280, y - 70, 'Tank killed:', {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(0, 0.5)
        scene.add
            .text(x - 280, y - 20, 'Health:', {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(0, 0.5)
        scene.add
            .text(x - 280, y + 30, 'Total:', {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(0, 0.5)
        scene.add
            .text(x - 280, y + 80, 'High Score:', {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(0, 0.5)

        const text1 = scene.add
            .text(x + 280, y - 70, `${this.numTankKilled} x 100 = ${this.numTankKilled * 100}`, {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(1, 0.5)

        const text2 = scene.add
            .text(x + 280, y - 20, `${this.health} x 75 = ${this.health * 75}`, {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(1, 0.5)

        highScore = Math.max(this.numTankKilled * 100 + this.health * 75, highScore)

        scene.add
            .text(x + 280, y + 80, `${highScore}`, {
                fontSize: '30px',
                fontFamily: 'Cambria',
                color: '#000000',
            })
            .setOrigin(1, 0.5)

        localStorage.setItem('highscore', highScore.toString())

        const tmp = { val: 0 }

        scene.tweens.add({
            targets: tmp,
            val: 1,
            duration: 2000,
            onUpdate: () => {
                text1.setText(
                    `${this.numTankKilled} x 100 = ${Math.floor(
                        tmp.val * this.numTankKilled * 100
                    )}`
                )
                text2.setText(
                    `${Math.floor(this.health * 100)} x 75 = ${Math.floor(
                        tmp.val * this.health * 75 * 100
                    )}`
                )
            },
            onComplete: () => {
                scene.add
                    .text(x + 280, y + 30, `${Math.floor(this.numTankKilled * 100 + this.health * 75 * 100)}`, {
                        fontSize: '30px',
                        fontFamily: 'Cambria',
                        color: '#000000',
                    })
                    .setOrigin(1, 0.5)
            },
        })
    }

    public addNumTankKilled(): void {
        this.numTankKilled++
    }

    public updateHealth(health: number): void {
        this.health = health
    }

    public getNumTankKilled(): number {
        return this.numTankKilled
    }
}
