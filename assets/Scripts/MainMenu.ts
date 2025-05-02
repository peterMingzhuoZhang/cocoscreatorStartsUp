import { _decorator, Button, CCString, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    
    @property(CCString)
    private mGameSceneId: string = "GameScene";
    @property(Button)
    private mStartGameButton: Button;

    public onLoad(): void {
        this.mStartGameButton.node.on(Button.EventType.CLICK, this.onStartGameButtonClick, this);
    }
    public onDestroy(): void {
        console.log('MainMenu destroyed');
        console.log('mStartGameButton:', this.mStartGameButton);

        if (this.mStartGameButton?.node?.isValid) {
            this.mStartGameButton.node.off(Button.EventType.CLICK, this.onStartGameButtonClick, this);
        }
    }
    update(deltaTime: number) {
        
    }

    private onStartGameButtonClick(level: number) {
        director.loadScene(this.mGameSceneId);
    }
    
}


