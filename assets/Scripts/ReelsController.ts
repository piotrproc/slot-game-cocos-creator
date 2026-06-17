import { _decorator, Component, Node } from 'cc';
import { ReelController } from "db://assets/Scripts/ReelController";
const { ccclass, property } = _decorator;

@ccclass('ReelsController')
export class ReelsController extends Component {

    @property([ReelController])
    reelControllers: ReelController[] = [];

    public stop() {
        this.reelControllers.forEach(reelController => {
            reelController.stop();
        })
    }

    public run() {
        this.reelControllers.forEach(reelController => {
            reelController.run();
        })
    }

    public toggle() {
        this.reelControllers.forEach(reelController => {
            reelController.toggle();
        })
    }

}


