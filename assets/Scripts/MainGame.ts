import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from './Core/ServiceLocator';
import { UIManager } from './Managers/UIManager';
import { ResourceManager } from './Managers/ResourceManager';
const { ccclass, property } = _decorator;

@ccclass('MainGame')
export class MainGame extends Component {

    start() {
        let UIManagerRef = ServiceLocator.get(UIManager);
        UIManagerRef.UIShowUp();

        let ResourceManagerRf = ServiceLocator.get(ResourceManager);
        UIManagerRef.InitTestSprite(ResourceManagerRf.getSprite(0));
    }

    update(deltaTime: number) {
        
    }
}


