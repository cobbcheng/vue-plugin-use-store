"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG_TARGET = '__registerId__';
var storeConf = {};
exports.useStore = function (name, module) {
    var store = storeConf.store;
    var regID = get(module, "state." + REG_TARGET);
    if (!store) {
        errLog('this plugin has not installed, please check it.');
        return [{}, function () { }];
    }
    if (hasRegister(module.state) && regID !== name) {
        errLog("the module has registered, named " + regID + ", please check it");
        return [{}, function () { }];
    }
    if (!hasRegister(module.state)) {
        targetState(module.state, name);
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
    throw new Error("[vue-plugin-use-store] " + desc);
}
function hasRegister(state) {
    return Boolean(state[REG_TARGET]);
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
function targetState(state, name) {
    Object.defineProperty(state, REG_TARGET, {
        value: name,
        writable: false,
        configurable: false,
        enumerable: false
    });
}
