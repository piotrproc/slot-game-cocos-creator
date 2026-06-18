import { _decorator, Component } from 'cc';
import { ReelController } from "db://assets/Scripts/ReelController";

const {ccclass, property} = _decorator;

@ccclass('ReelsController')
export class ReelsController extends Component {

    @property([ReelController])
    reelControllers: ReelController[] = [];

    public stop() {
        this.reelControllers.forEach(reelController => {
            reelController.stop();
        })
        this.saveOutcome();
    }

    public run() {
        this.reelControllers.forEach(reelController => {
            reelController.run();
        })
    }

    public toggle() {
        if (this.reelControllers[0].hasStopped) {
            this.run();
        } else {
            this.stop();
        }
    }

    public saveOutcome() {
        const outcome = this.reelControllers.map((controller) => {
            return controller.outcome;
        })

        console.log(outcome);
    }
}


