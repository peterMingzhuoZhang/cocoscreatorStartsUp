import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public totalScore: number = 0;

    private currentInitProcess: number = 0;
    private totalProcess: number = 1;

    onLoad() {
        console.log('Score manager Initializing');
    }

    /**
     * 初始化逻辑
     */
    public async init(): Promise<void> {
        console.log('Initializing score record...');
        await new Promise(resolve => setTimeout(resolve, 100)); // 模拟异步加载
        this.totalScore = 0;
        this.currentInitProcess++;
    }

    /**
     * 初始化进度
     */
    public getInitProgress(): number {
        const ret = this.currentInitProcess / this.totalProcess;
        return ret > 1.0 ? 1.0 : ret;
    }
    
    
}


