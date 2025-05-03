import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectPool')
export class ObjectPool extends Component {
    @property({ type: Prefab })
    prefabList: Prefab[] = [];

    @property({ type: [String] })
    prefabNames: string[] = [];

    @property({ type: [Number] })
    poolSizes: number[] = [];

    private _objectPoolByName: Map<string, Node[]> = new Map();
    private _isInitialized = false;

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    onLoad() {
        this.initializePool();
    }

    private initializePool() {
        if (this.prefabList.length !== this.prefabNames.length || this.prefabList.length !== this.poolSizes.length) {
            console.error('ObjectPoolManager 配置错误：prefabList, prefabNames, poolSizes 长度不一致');
            return;
        }

        for (let i = 0; i < this.prefabList.length; i++) {
            const name = this.prefabNames[i];
            const prefab = this.prefabList[i];
            const poolSize = this.poolSizes[i];

            if (this._objectPoolByName.has(name)) {
                console.warn(`已有名为 ${name} 的对象池`);
                continue;
            }

            const poolRoot = new Node(name);
            this.node.addChild(poolRoot);

            const pool: Node[] = [];
            for (let j = 0; j < poolSize; j++) {
                const go = instantiate(prefab);
                go.name = `${name}_${j.toString().padStart(3, '0')}`;
                poolRoot.addChild(go);
                go.active = false;
                pool.push(go);
            }

            this._objectPoolByName.set(name, pool);
        }

        this._isInitialized = true;
    }

    public getObjectFromPool(poolName: string): Node | null {
        const pool = this._objectPoolByName.get(poolName);
        if (!pool) {
            console.error(`未找到名为 ${poolName} 的对象池`);
            return null;
        }

        for (const go of pool) {
            if (!go.active) {
                return go;
            }
        }

        console.warn(`对象池 ${poolName} 已耗尽`);
        return null;
    }

    public recycleObject(go: Node): void {
        go.active = false;
    }
}


