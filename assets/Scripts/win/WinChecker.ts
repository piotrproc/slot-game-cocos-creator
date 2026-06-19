import { _decorator, Component, Label, Node } from 'cc';
import { BetlineCoordinates, WILD } from "../utils/types";
import { BETLINES_DATA, PAYTABLE_DATA } from "../win/BetlinesData";
import { Betline } from "../Betline";
import { INIT_BALANCE, SPIN_COST } from "../utils/consts";
import { AudioController } from "../AudioController";

const {ccclass, property} = _decorator;

// type WinType = 3 | 4 | 5;

type BetlineWinType = {
    symbol: string;
    symbolsOnBetlineWin: number;
    coordinates: BetlineCoordinates;
}

@ccclass('WinChecker')
export class WinChecker extends Component {

    @property({
        type: Label
    })
    public winLabel: Label;

    @property({
        type: Label
    })
    public balanceLabel: Label;

    public winValue:number = 0;
    public balanceValue: number;

    setBalance(value: number) {
        this.balanceValue = value;
        this.balanceLabel.string = '' + this.balanceValue;
    }

    setWin(value: number) {
        this.winValue = value;
        this.winLabel.string = '' + this.winValue;
    }

    reduceBalance(value: number) {
        this.balanceValue = Number(this.balanceValue) - value;
        this.setBalance(this.balanceValue);
    }

    onNewSpin() {
        this.reduceBalance(SPIN_COST);
        this.setWin(0);
    }

    onLoad() {
        this.setBalance(INIT_BALANCE);
        this.setWin(0);
    }

    checkWin(symbolOutcomes: Node[][], betline: Betline, audioController: AudioController) {
        this.setWin(this.winValue);

        for (let coordinates of BETLINES_DATA) {
            const betlineWinObject: BetlineWinType = this.checkBetline(symbolOutcomes, coordinates);

            const win = PAYTABLE_DATA[betlineWinObject.symbol][betlineWinObject.symbolsOnBetlineWin]
            if (win > 0) {
                this.winValue += win;
                this.balanceValue += win;
                this.setWin(this.winValue);
                this.setBalance(this.balanceValue);
                betline.drawLine(betlineWinObject.coordinates);
            }
        }

        if(this.winValue > 0) {
            audioController.onAudioQueue(1);
        }
    }

    checkBetline(symbolOutcomes: Node[][], coordinates: BetlineCoordinates): BetlineWinType {
        let symbol = symbolOutcomes[0][coordinates[0]];
        let symbolsOnBetlineWin = 1;

        for (let i = 1; i < coordinates.length; i++) {
            const symbolCheck = symbolOutcomes[i][coordinates[i]];
            if (symbol["_name"] != symbolCheck["_name"] && symbolCheck["_name"] != WILD) {
                break;
            }
            symbolsOnBetlineWin++;
        }

        return {
            symbol: symbol["_name"],
            symbolsOnBetlineWin,
            coordinates
        };
    }

}