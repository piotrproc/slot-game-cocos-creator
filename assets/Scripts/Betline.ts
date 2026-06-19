import { _decorator, Color, Component, Graphics, GraphicsComponent } from 'cc';
import { SYMBOL_SIZE } from "./utils/consts";
import { BetlineCoordinates } from './utils/types';

const {ccclass} = _decorator;

@ccclass('Betline')
export class Betline extends Component {

    private symbolSize = SYMBOL_SIZE;
    private graphics: GraphicsComponent;

    onLoad() {
        this.graphics = this.getComponent(Graphics)!
        this.clear();

        this.graphics.lineWidth = 8;
        this.graphics.strokeColor = new Color(255, 0, 0, 255);
    }

    drawLine(coordinates: BetlineCoordinates) {

        this.graphics.moveTo(0, coordinates[0] * (-this.symbolSize));

        for (let i = 0; i < coordinates.length; i++) {
            this.graphics.quadraticCurveTo(
                this.symbolSize * i, -this.symbolSize * coordinates[i],
                this.symbolSize * (i + 1), -this.symbolSize * coordinates[i + 1]
            );
        }

        this.graphics.stroke();
    }

    clear() {
        this.graphics?.clear();
    }

}


