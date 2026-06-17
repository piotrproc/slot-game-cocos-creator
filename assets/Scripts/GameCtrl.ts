import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { ReelsController } from './ReelsController';
import { Betline } from "./Betline";

const {ccclass, property} = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: ReelsController
    })
    public reelController: ReelsController;

    @property({
        type: Node
    })
    public spinButton: Node;

    @property({
        type: Betline
    })
    public betline: Betline;

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.spinButton.on(Node.EventType.TOUCH_START, () => {
            this.reelController.toggle();
            this.betline.draw();
        });
    }

    //testing - method DELETE ME IN FINAL VERSION
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_Q:
                this.reelController.run();
                break;
            case KeyCode.KEY_P:
                break;
            case KeyCode.KEY_W:
                this.reelController.stop();
                break;
        }
    }

    onLoad() {
        this.initListener();
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


