import { MUSIC } from '../const/const'

export default class Music {
    private static music:
        | Phaser.Sound.WebAudioSound
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound

    public static shootSfx:
        | Phaser.Sound.WebAudioSound
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound

    public static hitSfx:
        | Phaser.Sound.WebAudioSound
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
    
    private static volume: number

    public static init(scene: Phaser.Scene): void {
        Music.music = scene.sound.add(MUSIC.Devonshire_Waltz_Allegretto)
        Music.music.volume = 0.5

        Music.shootSfx = scene.sound.add(MUSIC.Shoot_SFX)
        Music.shootSfx.volume = 0.5
        Music.hitSfx = scene.sound.add(MUSIC.Hit_SFX)
        Music.hitSfx.volume = 0.5


        Music.setVolume(0.5)
    }

    public static setVolume(volume: number): void {
        if (volume < 0) volume = 0
        if (volume > 1) volume = 1
        Music.volume = volume
        Music.music.setVolume(volume)
        Music.shootSfx.setVolume(volume * 0.1)
        Music.hitSfx.setVolume(volume * 0.1)
    }

    public static play(): void {
        Music.music.play()
    }

    public static stop(): void {
        Music.music.stop()
    }

    public static pause(): void {
        Music.music.pause()
    }

    public static resume(): void {
        Music.music.resume()
    }

    public static update(): void {
        if (!Music.music.isPlaying) {
            Music.play()
        }
    }

    public static getVolume(): number {
        return Music.volume
    }
}
