import { _decorator, Component, ProgressBar, Label, director, Node } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { AsyncLoader } from './AsyncLoader';
import { GameManager } from '../Managers/GameManager';
import { UIManager } from '../Managers/UIManager';
import { ResourceManager } from '../Managers/ResourceManager';

const { ccclass, property } = _decorator;

@ccclass('GameLoader')
export class GameLoader extends AsyncLoader {
    private static _instance: GameLoader; // The only singleton you should have.
    
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    @property(Label)
    infoText: Label = null;

    @property(Label)
    progressText: Label = null;

    private targetScene: string = 'MainMenu';

    protected onLoad() {
        super.onLoad?.(); // 如果父类重写 onLoad，可以保留

        console.log("GameLoader Starting");

        // Safety Check
        if (GameLoader._instance != null && GameLoader._instance != this)
        {
            console.log("A duplicate instance of the GameLoader was found");
            this.destroy();
            return;
        }

        GameLoader._instance = this; // Singleton

        // 移植到这里了！！ TODO
        if (!director.isPersistRootNode(this.node)) {
            director.addPersistRootNode(this.node);
        }

        // 注册初始化模块
        this.enqueue(async () => {
            const gm = new GameManager();
            ServiceLocator.register(GameManager, gm);
            await gm.init();
        }, 30, () => ServiceLocator.get(GameManager)?.getInitProgress() ?? 1);

        this.enqueue(async () => {
            const ui = new UIManager();
            ServiceLocator.register(UIManager, ui);
            let uiCanvas = this.node.getChildByName("UI").getChildByName("Canvas");
            await ui.init(uiCanvas, this);
        }, 40, () => ServiceLocator.get(UIManager)?.getInitProgress() ?? 1);

        this.enqueue(async () => {
            const rm = new ResourceManager();
            ServiceLocator.register(ResourceManager, rm);
            await rm.init();
        }, 30, () => ServiceLocator.get(ResourceManager)?.getInitProgress() ?? 1);


        this.startAsync().then(() => {
            director.loadScene(this.targetScene);
        });
    }

    protected onProgressUpdated(p: number): void {
        if (this.progressBar) this.progressBar.progress = p;
        if (this.progressText) this.progressText.string = `${Math.floor(p * 100)} %`;
    }
    public loadScene(sceneId: string){
        director.loadScene(sceneId);
    }

}