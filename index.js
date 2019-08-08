"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storeConf = {};
exports.useStore = function (name, module) {
    var store = storeConf.store;
    if (!store) {
        errLog('this plugin has not installed, please check it.');
        return [{}, function () { }];
    }
    if (!hasRegister(module.state, store, name)) {
        store.registerModule(name, module);
    }
    var state = store.state[name];
    function dispatch(action, payload) {
        return store.dispatch(action, payload);
    }
    return [
        state,
        dispatch
    ];
};
exports.useStorePlugin = function (store) {
    storeConf.store = store;
};
function errLog(desc) {
    console.error(desc);
}
function hasRegister(state, store, name) {
    return Object.keys(state).some(function (v) {
        return get(store, "state." + name + "." + v);
    });
}
function get(obj, path) {
    if (obj.hasOwnProperty(path)) {
        return obj[path];
    }
    else {
        return path.split('.').reduce(function (acc, cur) {
            return (acc && acc[cur]) || null;
        }, obj);
    }
}
