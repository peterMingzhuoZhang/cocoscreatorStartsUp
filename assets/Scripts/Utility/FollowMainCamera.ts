import { _decorator, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowMainCamera')
export class FollowMainCamera extends Component {
    @property({ tooltip: '主相机路径，如 GameScene/MainCamera' })
    mainCameraPath: string = 'Main Camera';

    private targetCamera: Node = null;

    

    update() {
        if (this.targetCamera) {
            this.node.setWorldPosition(this.targetCamera.worldPosition);
            this.node.setWorldRotation(this.targetCamera.worldRotation);
        }
    }

    public startFollowCameraMainCamera() {
        this.targetCamera = find(this.mainCameraPath);
        if (!this.targetCamera) {
            console.warn('找不到主相机:', this.mainCameraPath);
        }
    }
}


