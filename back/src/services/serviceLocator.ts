export class ServiceLocator {
  private static _instance: ServiceLocator
  private _services: Map<symbol, unknown>

  private constructor() {
    this._services = new Map()
  }

  private static getInstance() {
    if (!ServiceLocator._instance)
      ServiceLocator._instance = new ServiceLocator()

    return ServiceLocator._instance
  }

  static registerService(s: symbol, instance: {}) {
    const inst = ServiceLocator.getInstance()

    if (inst._services.has(s))
      throw new Error(
        `Tried to register service '${s.toString()}' which was already registered!`
      )

    inst._services.set(s, instance)
  }

  static getService<T>(s: symbol): T {
    const instance = ServiceLocator.getInstance()._services.get(s) as T

    if (!instance) throw new Error(`Unable to locate service '${s.toString()}'`)

    return instance
  }
}
