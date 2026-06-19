import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { ReelsController } from './ReelsController';

const {ccclass, property} = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: ReelsController
    })
    public reelsController: ReelsController;

    @property({
        type: Node
    })
    public spinButton: Node;

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.spinButton.on(Node.EventType.TOUCH_START, () => {
            this.reelsController.toggle();
        });
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                this.reelsController.toggle();
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


