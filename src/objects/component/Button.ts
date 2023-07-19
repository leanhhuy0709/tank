import { IButtonConstructor } from '../../interfaces/button.interface'

export default class Button extends Phaser.GameObjects.Rectangle {
    public color1: number
    public color2: number

    private text: Phaser.GameObjects.Text

    private container: Phaser.GameObjects.Container

    private pointerDownCallBack: Function | undefined

    private isDown = false

    public constructor(aParams: IButtonConstructor) {
        super(
            aParams.scene,
            0,
            0,
            aParams.width,
            aParams.height,
            aParams.color,
            aParams.alpha
        )
        this.scene.add.existing(this)

        if (aParams.color) this.color1 = aParams.color
        if (aParams.hoverColor) this.color2 = aParams.hoverColor

        this.setInteractive()
        this.on('pointerdown', () => this.handlePointerDown())
        this.on('pointerup', () => this.handlePointerUp())
        this.on('pointerover', () => this.handlePointerOver())
        this.on('pointerout', () => this.handlePointerOut())

        this.text = this.scene.add
            .text(0, 0, 'Button', {
                fontFamily: 'Cambria',
                fontSize: '32px',
                color: '#000000',
                fontStyle: 'bold',
            })
            .setOrigin(0.5, 0.5)

        this.container = this.scene.add.container(aParams.x, aParams.y, [this, this.text])
    }

    private handlePointerDown(): void {
        this.fillColor = this.color2

        this.isDown = true
    }

    private handlePointerUp(): void {
        this.fillColor = this.color1

        if (this.pointerDownCallBack && this.isDown) this.pointerDownCallBack()

        this.isDown = false
    }

    private handlePointerOver(): void {
        this.fillColor = this.color2
    }

    private handlePointerOut(): void {
        this.fillColor = this.color1
    }

    public setContent(content: string): Button {
        this.text.setText(content)
        return this
    }

    public setTextColor(color: string): Button {
        this.text.setColor(color)
        return this
    }

    public setTextSize(size: number): Button {
        this.text.setFontSize(size)
        return this
    }

    public setFunction(func: Function): Button {
        this.pointerDownCallBack = func
        return this
    }

    public setPos(x: number, y: number): Button {
        this.container.setPosition(x, y)
        return this
    }
}
