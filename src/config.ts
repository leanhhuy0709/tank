import GameOverScene from './scenes/GameOverScene'
import GameScene from './scenes/GameScene'
import LoadingScene from './scenes/LoadingScene'
import MenuScene from './scenes/MenuScene'
import PauseScene from './scenes/PauseScene'
import SettingScene from './scenes/SettingScene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    url: 'https://github.com/leanhhuy0709/tank',

    version: '2.0',
    type: Phaser.AUTO,
    parent: 'Game',
    scene: [LoadingScene, MenuScene, GameScene, PauseScene, SettingScene, GameOverScene],
    input: {
        keyboard: true,
    },
    width: 1600,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE
    },
    backgroundColor: '#123456s',
    render: { pixelArt: false, antialias: true },
}
