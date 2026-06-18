import { _decorator, Component, Node } from 'cc';
import { ReelController } from "./ReelController";

const {ccclass, property} = _decorator;

@ccclass('ReelsController')
export class ReelsController extends Component {

    @property([ReelController])
    reelControllers: ReelController[] = [];

    public outcome: Node[][] = [[],[],[],[],[]];

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
        if (this.isStopped()) {
            this.run();
        } else {
            this.stop();
        }
    }

    public isStopped() {
        return this.reelControllers[0].hasStopped;
    }

    public saveOutcome() {
        this.outcome = this.reelControllers.map((controller) => {
            return controller.outcome;
        })

        console.log(this.outcome);
    }
}


