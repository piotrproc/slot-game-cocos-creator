import { _decorator, Component, Node } from 'cc';
import { ReelController } from "./ReelController";
import { Betline } from "./Betline";

const {ccclass, property} = _decorator;

@ccclass('ReelsController')
export class ReelsController extends Component {

    @property([ReelController])
    reelControllers: ReelController[] = [];

    @property({
        type: Betline
    })
    public betline: Betline;

    public outcome: Node[][] = [[],[],[],[],[]];

    public stop() {
        this.reelControllers.forEach(reelController => {
            reelController.onStopped = this.onStopped.bind(this);
            reelController.stop();
        })
    }

    public run() {
        this.betline.clear();

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
        return this.reelControllers[0].isStopped();
    }

    public onStopped() {
        this.saveOutcome();
        this.betline.draw();
    }

    public saveOutcome() {
        this.outcome = this.reelControllers.map((controller) => {
            return controller.outcome;
        })

        console.log(this.outcome);
    }
}


