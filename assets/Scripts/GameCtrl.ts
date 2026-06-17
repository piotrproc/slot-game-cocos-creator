import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { ReelController } from './ReelController';
import { SpinButton } from "./SpinButton";

const {ccclass, property} = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: ReelController
    })
    public reelController: ReelController;

    @property({
        type: Node
    })
    public spinButton: Node;

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.spinButton.on(Node.EventType.TOUCH_START, () => {
            this.reelController.toggle();
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


