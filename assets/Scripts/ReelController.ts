import { _decorator, Component, instantiate, Node, Prefab, SpriteFrame } from 'cc';

const {ccclass, property} = _decorator;

@ccclass('ReelController')
export class ReelController extends Component {

    @property([Prefab])
    symbolPrefabs: Prefab[] = [];

    private symbols: Node[] = [];
    private symbolHeight = 250;

    private hasStopped = false;
    private isStopping = false;

    onLoad() {

        this.hasStopped = true;

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

        if (this.hasStopped) {
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

                if (this.isStopping == true) {
                    this.hasStopped = true;
                    this.isStopping = false;
                }
            }
        }
    }

    public stop() {
        this.isStopping = true;
    }

    public run() {
        this.hasStopped = false;
    }

    public toggle() {
        if (this.hasStopped) {
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
}


