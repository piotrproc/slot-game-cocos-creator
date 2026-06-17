import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpinButton')
export class SpinButton extends Component {

    onLoad() {
        this.initListener();
    }

    initListener() {
        this.node.on(Node.EventType.TOUCH_START, () => {

        });
    }

}


