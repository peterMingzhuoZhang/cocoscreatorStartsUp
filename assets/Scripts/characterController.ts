import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('characterController')
export class characterController extends Component {
    
    public onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    private onKeyDown(event: EventKeyboard){
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                console.log('按下 W');
                break;
            case KeyCode.KEY_A:
                console.log('按下 A');
                break;
            case KeyCode.KEY_S:
                console.log('按下 S');
                break;
            case KeyCode.KEY_D:
                console.log('按下 D');
                break;
        }
    }
}


