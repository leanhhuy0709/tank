import { MUSIC } from '../const/const'

export default class Music {
    private static music:
        | Phaser.Sound.WebAudioSound
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound

    public static init(scene: Phaser.Scene): void {
        Music.music = scene.sound.add(MUSIC.Devonshire_Waltz_Allegretto)
        Music.music.volume = 0.5
    }

    public static setVolume(volume: number): void {
        Music.music.setVolume(volume)
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
        return Music.music.volume
    }
}
