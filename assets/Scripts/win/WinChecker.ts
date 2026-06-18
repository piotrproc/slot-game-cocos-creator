import { _decorator, Component, Node } from 'cc';
import { BetlineCoordinates, WILD } from "../utils/types";
import { BETLINES_DATA, PAYTABLE_DATA } from "../win/BetlinesData";
import { Betline } from "../Betline";

const {ccclass} = _decorator;

// type WinType = 3 | 4 | 5;

type BetlineWinType = {
    symbol: string;
    symbolsOnBetlineWin: number;
    coordinates: BetlineCoordinates;
}

@ccclass('WinChecker')
export class WinChecker extends Component {

    checkWin(symbolOutcomes: Node[][], betline: Betline) {

        for (let coordinates of BETLINES_DATA) {
            const betlineWinObject: BetlineWinType = this.checkBetline(symbolOutcomes, coordinates);

            const win = PAYTABLE_DATA[betlineWinObject.symbol][betlineWinObject.symbolsOnBetlineWin]
            if(win > 0) {
                betline.drawLine(betlineWinObject.coordinates);
                // console.log("============");
                // console.log(betlineWinObject);
                // console.log(symbolOutcomes)
            }
        }
    }

    checkBetline(symbolOutcomes: Node[][], coordinates: BetlineCoordinates): BetlineWinType {
        let symbol = symbolOutcomes[0][coordinates[0]];
        let symbolsOnBetlineWin = 1;

        for (let i = 1; i < coordinates.length; i++) {
            const symbolCheck = symbolOutcomes[i][coordinates[i]];
            if (symbol["_name"] != symbolCheck["_name"] && symbol["_name"] != WILD) {
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