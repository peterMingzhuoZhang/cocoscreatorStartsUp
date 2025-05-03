import { _decorator, AudioClip, Component, Node, SpriteFrame } from 'cc';
import { RemoteLoader } from '../Utility/RemoteLoader';
const { ccclass, property } = _decorator;

@ccclass('ResourceManager')
export class ResourceManager extends Component {
    
    // Sprite
    private mNeedToLoadSpriteURL: string[] = ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVsEDbDmMBjnNDIH1MGgyRDAmWLi5bNk6Xj9hp_bsvXaIwK95Lg_btj8HZNKrIZC4jj6ATEo7EZY0izNAx1Wmc1tpIjNZKWjOIzVBzgyckwVFmyGxJSttuupoR00_2OB4kZZYC5Jb_HK6G/s1600/IMG_5193.PNG"];
    private mNeedToLoadSpriteURL_wx: string[] = [""];
    private mPreLoadSprite: SpriteFrame[] = [];

    // Aduio
    private mNeedToLoadAudioURL: string[] = [];
    private mNeedToLoadAudioURL_wx: string[] = [];
    private mPreLoadAudio: AudioClip[] = [];

    private currentInitProcess: number = 0;
    private totalProcess: number = 2;

    onLoad() {
        console.log('Score manager Initializing');
    }

    /**
     * 初始化逻辑
     */
    public async init(): Promise<void> {
        console.log('preload sprites...');
        let needToLoadSpriteURL = this.isWX() ? this.mNeedToLoadSpriteURL_wx : this.mNeedToLoadSpriteURL;
        for(let i = 0; i < needToLoadSpriteURL.length; i++){
            const sprite = await RemoteLoader.loadRemoteSpriteFrame(needToLoadSpriteURL[i]);
            this.mPreLoadSprite.push(sprite);

        }
        this.currentInitProcess++;

        console.log('preload audios...');
        let needToLoadAduioURL = this.isWX() ? this.mNeedToLoadAudioURL_wx : this.mNeedToLoadAudioURL;
        for(let i = 0; i < needToLoadAduioURL.length; i++){
            const audio = await RemoteLoader.loadRemoteAudio(needToLoadSpriteURL[i]);
            this.mPreLoadAudio.push(audio);

        }
        this.currentInitProcess++;

    }

    /**
     * 初始化进度
     */
    public getInitProgress(): number {
        const ret = this.currentInitProcess / this.totalProcess;
        return ret > 1.0 ? 1.0 : ret;
    }

    public getSprite(id: number): SpriteFrame{
        if(this.getInitProgress() == 1.0){
            return this.mPreLoadSprite[id];
        }else{
            return null;
        }
    }

    public getAudio(id: number): AudioClip{
        if(this.getInitProgress() == 1.0){
            return this.mPreLoadAudio[id];
        }else{
            return null;
        }
    }

    private isWX(): boolean {
        return typeof wx !== 'undefined';
    }

}


