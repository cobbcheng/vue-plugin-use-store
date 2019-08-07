import { Store, Plugin } from 'vuex'

interface ModuleType {
  state: object,
  actions: object,
  mutations: object
}

interface useStore<T> {
  (name: string, module: ModuleType): T
}

const storeConf: any = {}

export const useStore: useStore<any[]> = function (
  name: string,
  module: ModuleType
) {
  const store = storeConf.store

  if (!store) {
    errLog('this plugin has not installed, please check it.')
    return [{}, () => {}]
  }

  if (!hasRegister(module.state, store, name)) {
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
  console.error(desc)
}

function hasRegister (
  state: object,
  store: any,
  name: string
): boolean {
  return Object.keys(state).some(v => {
    return get(store, `state.${name}.${v}`)
  })
}

interface Objtype {
  [key: string]: any
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
