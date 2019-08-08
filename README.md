# vue-plugin-use-store

### useage

```javascript
// store/index.ts

import Vue from 'vue'
import Vuex from 'vuex'
import { useStorePlugin } from 'vue-plugin-use-store'

Vue.use(Vuex)

export default new Vuex.Store<object>({
  state: {

  },
  mutations: {

  },
  actions: {

  },

  plugins: [useStorePlugin]
})
```

```javascript
// views/pageEg.vue

import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from 'vue-plugin-use-store'
import store from './store'
import { computed } from 'vue'

@Component({
  components: {
    HelloWorld
  }
})

export default class Home extends Vue {
  setup (props, ctx) {
    const [state, dispatch] = useStore('awesome', store)
    const testState = computed(() => {
      return state
    })
    
    return {
      testState,
      dispatch
    }
  }
}
```

```javascript
// ./store.ts

import { Module, ActionPayload, ActionContext } from 'vuex'

interface Objtype {
  [key: string]: any
}

const state: any = {
  ts: 'is awesome'
}

const mutations = {
  AWESOME (state: Objtype, payload: any) {
    state.ts = payload
  }
}
const actions = {
  typesctipt (ctx: ActionContext<any, any>, payload: ActionPayload) {
    const commit = ctx.commit
    commit('AWESOME', payload)
  }
}

const module = {
  state,
  mutations,
  actions
}

export default module


```





