import { _decorator, Color, Component, Graphics } from 'cc';
import { SYMBOL_SIZE } from "./utils/consts";

const {ccclass} = _decorator;

type Coordinates = [0|1|2, 0|1|2, 0|1|2, 0|1|2, 0|1|2];

@ccclass('Betline')
export class Betline extends Component {

    private symbolSize = SYMBOL_SIZE;

    draw() {
        const g = this.getComponent(Graphics)!;

        g.clear();

        g.lineWidth = 8;
        g.strokeColor = new Color(255, 0, 0, 255);

        // this.drawLine(g, [0,0,0,0,0]);
        // this.drawLine(g, [0,1,0,1,0]);
        // this.drawLine(g, [2, 1, 0, 1, 2]);
        this.drawLine(g, [0, 1, 2, 1, 2]);
    }

    drawLine(graphicComponent: Graphics, coordinates: Coordinates) {

        graphicComponent.moveTo(0, coordinates[0] * (-this.symbolSize));

        for (let i = 0; i < coordinates.length; i++) {
            graphicComponent.quadraticCurveTo(
                this.symbolSize * i, -this.symbolSize * coordinates[i],
                this.symbolSize * (i + 1), -this.symbolSize * coordinates[i + 1]
            );
        }

        graphicComponent.stroke();

    }
}


