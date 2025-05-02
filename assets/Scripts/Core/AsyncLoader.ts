import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export interface RoutineInfo {
    routine: () => Promise<void>;
    weight: number;
    progress?: () => number;
}

type CompletionCallback = () => void;

@ccclass('AsyncLoader')
export abstract class AsyncLoader extends Component {
    private _pending: RoutineInfo[] = [];
    private static _completed = false;
    private static _progress = 0;
    private static _callbacks: CompletionCallback[] = [];

    public static get Complete(): boolean {
        return this._completed;
    }

    public static get Progress(): number {
        return this._progress;
    }

    protected onProgressUpdated(percent: number): void {}

    protected enqueue(routine: () => Promise<void>, weight: number, progress?: () => number) {
        this._pending.push({ routine, weight, progress });
    }

    protected async startAsync() {
        if (AsyncLoader._completed) {
            AsyncLoader._progress = 1.0;
            this._pending = [];
            return;
        }

        const totalWeight = this._pending.reduce((sum, r) => sum + r.weight, 0);
        let completedWeight = 0;

        for (const info of this._pending) {
            const routinePromise = info.routine();
            let progressUnitCompletion = 0;
            while (progressUnitCompletion != 1.0) {
                await new Promise(resolve => setTimeout(resolve, 50));
                progressUnitCompletion = info.progress();
                const partial = progressUnitCompletion * info.weight / totalWeight;
                AsyncLoader._progress = completedWeight / totalWeight + partial;
                this.onProgressUpdated(AsyncLoader._progress);
                if (AsyncLoader._progress >= 1.0) break;
            }
            await routinePromise;
            completedWeight += info.weight;
            AsyncLoader._progress = completedWeight / totalWeight;
            this.onProgressUpdated(AsyncLoader._progress);
        }

        AsyncLoader._completed = true;
        AsyncLoader._callbacks.forEach(cb => cb());
        AsyncLoader._callbacks = [];
    }

    public static callOnComplete(callback: CompletionCallback) {
        if (this._completed) {
            callback();
        } else {
            this._callbacks.push(callback);
        }
    }
}


