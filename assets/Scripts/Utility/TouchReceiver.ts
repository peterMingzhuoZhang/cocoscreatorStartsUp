import { _decorator, Component, EventTouch, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchReceiver')
export class TouchReceiver extends Component {
    
    private mHalfScreenWidth = 0;
    private mHalfScreenHeight = 0;

    public onLoad(): void {

        let screenSize = view.getVisibleSize();
        this.mHalfScreenWidth = screenSize.x * 0.5;
        this.mHalfScreenHeight = screenSize.y * 0.5;
        console.log("Screen Size: ");
        console.log(screenSize);

        this.node.on(Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCancelHandler, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEndHandler, this);
    }

    public onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.touchCancelHandler, this);
        this.node.off(Node.EventType.TOUCH_END, this.touchEndHandler, this);
    }
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    // Touch control -------------------------------------------------------------------
    public touchStartHandler(e: EventTouch): void {
        const touch = e.getTouches()[0];
        let touchLocation = touch.getUILocation();
        touchLocation.x -= this.mHalfScreenWidth;
        touchLocation.y -= this.mHalfScreenHeight;
    
        console.log("Touch start on:");
        console.log("x: "+ touchLocation.x + "y: "+ touchLocation.y);
    }

    public touchMoveHandler(e: EventTouch): void {
        const touch = e.getTouches()[0];
        let touchLocation = touch.getUILocation();
        touchLocation.x -= this.mHalfScreenWidth;
        touchLocation.y -= this.mHalfScreenHeight;

        console.log("Touch move to:");
        console.log("x: "+ touchLocation.x + "y: "+ touchLocation.y);
    }
    
    public touchEndHandler(e: EventTouch): void {
        const touch = e.getTouches()[0];
        let touchLocation = touch.getUILocation();
        touchLocation.x -= this.mHalfScreenWidth;
        touchLocation.y -= this.mHalfScreenHeight;
        
        console.log("Touch end on:");
        console.log("x: "+ touchLocation.x + "y: "+ touchLocation.y);
    }

    public touchCancelHandler(e: EventTouch): void {
        const touch = e.getTouches()[0];
        let touchLocation = touch.getUILocation();
        touchLocation.x -= this.mHalfScreenWidth;
        touchLocation.y -= this.mHalfScreenHeight;
        
        console.log("Touch cancel on:");
        console.log("x: "+ touchLocation.x + "y: "+ touchLocation.y);
    }
}


