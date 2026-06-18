import { _decorator, Color, Component, Graphics, GraphicsComponent } from 'cc';
import { SYMBOL_SIZE } from "./utils/consts";

const {ccclass} = _decorator;

type Coordinates = [0|1|2, 0|1|2, 0|1|2, 0|1|2, 0|1|2];

@ccclass('Betline')
export class Betline extends Component {

    private symbolSize = SYMBOL_SIZE;
    private graphics: GraphicsComponent;

    draw() {
        this.graphics = this.getComponent(Graphics)!
        this.clear();

        this.graphics.lineWidth = 8;
        this.graphics.strokeColor = new Color(255, 0, 0, 255);

        // this.drawLine(g, [0,0,0,0,0]);
        // this.drawLine(g, [0,1,0,1,0]);
        // this.drawLine(g, [2, 1, 0, 1, 2]);
        this.drawLine([0, 1, 2, 1, 2]);
    }

    drawLine(coordinates: Coordinates) {

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


