import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from './Core/ServiceLocator';
import { UIManager } from './Managers/UIManager';
const { ccclass, property } = _decorator;

@ccclass('MainGame')
export class MainGame extends Component {

    start() {
        let UIManagerRef = ServiceLocator.get(UIManager);
        UIManagerRef.UIShowUp();
    }

    update(deltaTime: number) {
        
    }
}


