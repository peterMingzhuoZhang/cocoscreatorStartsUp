export class ServiceLocator {
    private static _services: Map<Function, any> = new Map();

    /**
     * 注册服务
     * @param type 类构造函数（推荐直接传类名）
     * @param instance 实例
     */
    public static register<T>(type: new (...args: any[]) => T, instance: T): T {
        if (this._services.has(type)) {
            console.warn(`Service of type ${type.name} already registered.`);
        } else {
            console.log(`Registering service: ${type.name}`);
            this._services.set(type, instance);
        }
        return instance;
    }

    /**
     * 获取服务
     * @param type 类构造函数
     * @returns 实例
     */
    public static get<T>(type: new (...args: any[]) => T): T {
        if (!this._services.has(type)) {
            console.warn(`No service of type ${type.name} found.`);
        }
        return this._services.get(type);
    }

    /**
     * 清除所有注册
     */
    public static clear() {
        this._services.clear();
    }
}