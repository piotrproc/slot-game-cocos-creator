import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass } = _decorator;

@ccclass('Symbol')
export class Symbol extends Component {

    public setSprite(frame: SpriteFrame) {
        this.getComponent(Sprite)!.spriteFrame = frame;
    }
}