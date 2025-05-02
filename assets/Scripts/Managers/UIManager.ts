import { _decorator, Component, Label, Button, Node, RichText } from 'cc';
import { GameLoader } from '../Core/GameLoader';
import { FollowMainCamera } from '../Utility/FollowMainCamera';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(RichText)
    private scoreText: RichText = null;

    @property(Button)
    private homeButton: Button = null;

    @property(Node)
    private mTouchArea: Node;

    public currentInitProcess = 0;
    public totalProcess = 3;

    onLoad() {
        console.log('UI manager Initializing');
    }

    /**
     * 初始化 UI 控件
     */
    public async init(canvas: Node, gameLoader: GameLoader): Promise<void> {
        console.log('Initializing scoreText...');
        this.scoreText = canvas.getChildByName('ScoreText')?.getComponent(RichText);
        this.currentInitProcess++;
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log('Initializing Home Button...');
        this.homeButton = canvas.getChildByName('HomeButton')?.getComponent(Button);
        if (this.homeButton) {
            const label = this.homeButton.node.getComponentInChildren(Label);
            if (label) label.string = 'Home';

            this.homeButton.node.active = false;

            this.homeButton.node.on(Button.EventType.CLICK, () => {
                gameLoader.loadScene("MainMenu");
                this.UIDisappear();
            });
        }

        this.currentInitProcess++;
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log('Initializing touchArea...');
        this.mTouchArea = canvas.getChildByName('TouchArea');
        this.currentInitProcess++;
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    public getInitProgress(): number {
        const ret = this.currentInitProcess / this.totalProcess;
        return ret > 1.0 ? 1.0 : ret;
    }

    public UIShowUp(): void {
        this.scoreText.node.active = true;
        this.homeButton.node.active = true;
        this.mTouchArea.active = true;
    }

    public UIDisappear(): void {
        this.scoreText.node.active = false;
        this.homeButton.node.active = false;
        this.mTouchArea.active = false;
    }

    public setScoreText(totalScore: number): void {
        if (this.scoreText) {
            this.scoreText.string = `Display score here: ${totalScore}`;
        }
    }

    public customUpdate(): void {
        // 可选的 UI 更新逻辑
    }
}


