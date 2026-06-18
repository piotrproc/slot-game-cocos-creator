import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
import { SYMBOL_SIZE } from "./utils/consts";
import { GameState } from "./utils/types";

const {ccclass, property} = _decorator;

@ccclass('ReelController')
export class ReelController extends Component {

    @property([Prefab])
    symbolPrefabs: Prefab[] = [];

    @property({
        type: CCInteger
    })
    public index: number;

    private symbols: Node[] = [];
    private symbolHeight = SYMBOL_SIZE;
    public outcome: Node[] = [];

    public state: GameState;

    onLoad() {
        this.state = "Initial";

        for (let i = 0; i < this.symbolPrefabs.length; i++) {

            const symbol = instantiate(this.symbolPrefabs[i]);

            symbol.parent = this.node;

            symbol.setPosition(
                0,
                (i - 1) * this.symbolHeight
            );

            this.symbols.push(symbol);
        }
    }

    update(deltaTime: number) {

        if (this.isStopped()) {
            return;
        }

        const speed = 1000;

        for (const symbol of this.symbols) {

            symbol.position = symbol.position.subtract3f(
                0,
                speed * deltaTime,
                0
            );

            if (symbol.position.y <= -this.symbolHeight * 2) {

                const topY = this.getTopSymbolY();

                symbol.setPosition(
                    0,
                    topY + this.symbolHeight
                );

                if (this.state === "Stopping") {
                    this.state = "Stopped";
                    this.saveOutcome();
                    // console.log("stopped", this.index);
                    this.onStopped();
                }
            }
        }
    }

    public onStopped() {
        // empty on purpose
    }

    public stop() {
        this.state = "Stopping";
    }

    public isStopped() {
        return this.state === "Stopped" || this.state === "Initial";
    }

    public run() {
        this.state = "Running";
    }

    public toggle() {
        if (this.state == "Stopped") {
            this.run();
        } else {
            this.stop();
        }
    }

    private getTopSymbolY(): number {
        let top = -99999;

        for (const s of this.symbols) {
            top = Math.max(top, s.position.y);
        }

        return top;
    }

    private saveOutcome() {
        const symbolsCopy = this.symbols.slice();

        symbolsCopy.sort((n1, n2) => {
            if (n1.position.y > n2.position.y) {
                return 1;
            }

            if (n1.position.y < n2.position.y) {
                return -1;
            }

            return 0;
        });

        this.outcome[0] = symbolsCopy[2];
        this.outcome[1] = symbolsCopy[1];
        this.outcome[2] = symbolsCopy[0];
        // console.log(this.outcome)
        // console.log(this.index)
    }
}


