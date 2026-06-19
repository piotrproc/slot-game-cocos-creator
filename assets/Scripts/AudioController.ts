import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';

const {ccclass, property} = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {

    @property({
        type: [AudioClip]
    })
    public clips: AudioClip[] = [];

    @property({
        type: AudioSource
    })
    public audioSource: AudioSource = null!;

    public onAudioQueue(index: number) {
        let clip: AudioClip = this.clips[index];

        this.audioSource.playOneShot(clip);
    }

}


