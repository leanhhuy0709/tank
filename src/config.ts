export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    url: 'https://github.com/leanhhuy0709/tank',

    version: '2.0',
    type: Phaser.AUTO,
    parent: 'Game',
    scene: [],
    input: {
        keyboard: true,
    },
    width: 1600,
    height: 1200,
    zoom: 0.6,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    backgroundColor: '#000000',
    render: { pixelArt: false, antialias: true },
}
