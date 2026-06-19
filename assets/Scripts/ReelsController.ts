import { _decorator, Component, Node } from 'cc';
import { ReelController } from "./ReelController";
import { Betline } from "./Betline";
import { WinChecker } from "./win/WinChecker";

const {ccclass, property} = _decorator;

@ccclass('ReelsController')
export class ReelsController extends Component {

    @property([ReelController])
    reelControllers: ReelController[] = [];

    @property({
        type: Betline
    })
    public betline: Betline;

    @property({
        type: WinChecker
    })
    public winChecker: WinChecker;

    public outcome: Node[][] = [[], [], [], [], []];

    public stop() {
        this.stopReel(0);
    }

    private stopReel(index: number) {
        const reel = this.reelControllers[index];

        reel.onStopped = () => {
            if (index < this.reelControllers.length - 1) {
                this.stopReel(index + 1);
            } else {
                this.onStopped();
            }
        };

        reel.stop();
    }

    public run() {
        this.betline.clear();
        this.winChecker.onNewSpin();

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
        return this.reelControllers[4].isStopped();
    }

    public onStopped() {
        this.saveOutcome();
        this.winChecker.checkWin(this.outcome, this.betline);
    }

    public saveOutcome() {
        this.outcome = this.reelControllers.map((controller) => {
            return controller.outcome;
        })
    }
}


