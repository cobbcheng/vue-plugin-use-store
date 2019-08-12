import { Store, Plugin } from 'vuex'

const REG_TARGET = '__registerId__'

interface ModuleType {
  state: Objtype,
  actions: object,
  mutations: object
}

interface useStore<T> {
  (name: string, module: ModuleType): T
}

interface Objtype {
  [key: string]: any
}

const storeConf: any = {}

export const useStore: useStore<any[]> = function (
  name: string,
  module: ModuleType
) {
  const store = storeConf.store
  const regID = get(module, `state.${REG_TARGET}`)

  if (!store) {
    errLog('this plugin has not installed, please check it.')
    return [{}, () => {}]
  }

  if (hasRegister(module.state) && regID !== name) {
    errLog(`the module has registered, named ${regID}, please check it`)
    return [{}, () => {}]
  }

  if (!hasRegister(module.state)) {
    targetState(module.state, name)
    store.registerModule(name, module)
  }

  const state = store.state[name]
  function dispatch (action: any, payload: any): any {
    return store.dispatch(action, payload)
  }

  return [
    state,
    dispatch
  ]
}

export const useStorePlugin: Plugin<any> = (store: Store<any>) => {
  storeConf.store = store
}

function errLog (desc: string) {
  throw new Error(`[vue-plugin-use-store] ${desc}`)
}

function hasRegister (
  state: any
): boolean {
  return Boolean(state[REG_TARGET])
}

function get (obj: Objtype, path: string): any {
  if (obj.hasOwnProperty(path)) {
    return obj[path]
  } else {
    return path.split('.').reduce((acc: Objtype, cur: string): any => {
      return (acc && acc[cur]) || null
    }, obj)
  }
}

function targetState (state: object, name: string): void {
  Object.defineProperty(state, REG_TARGET, {
    value: name,
    writable: false,
    configurable: false,
    enumerable: false
  })
}
