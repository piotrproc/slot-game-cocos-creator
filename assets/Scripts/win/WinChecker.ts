import { _decorator, Component, Node } from 'cc';
import { BetlineCoordinates } from "../utils/types";
import { BETLINES_DATA, PAYTABLE_DATA } from "db://assets/Scripts/win/BetlinesData";

const {ccclass} = _decorator;

// type WinType = 3 | 4 | 5;

type BetlineWinType = {
    symbol: string;
    symbolsOnBetlineWin: number;
}

@ccclass('WinChecker')
export class WinChecker extends Component {

    checkWin(symbolOutcomes: Node[][]) {

        for (let coordinates of BETLINES_DATA) {
            const betlineWinObject: BetlineWinType = this.checkBetline(symbolOutcomes, coordinates);

            const win = PAYTABLE_DATA[betlineWinObject.symbol][betlineWinObject.symbolsOnBetlineWin]
            console.log(win);
        }

    }

    checkBetline(symbolOutcomes: Node[][], coordicates: BetlineCoordinates) :BetlineWinType {
        let symbol = symbolOutcomes[0][coordicates[0]];
        let symbolsOnBetlineWin = 1;

        for (let i = 1; i < coordicates.length; i++) {
            const symbolCheck = symbolOutcomes[i][coordicates[i]];
            if (symbol["_name"] != symbolCheck["_name"]) {
                break;
            }
            symbolsOnBetlineWin++;
        }

        return {
            symbol: symbol["_name"],
            symbolsOnBetlineWin
        };
    }

}