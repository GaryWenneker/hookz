var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function setState(store, newState, afterUpdateCallback) {
    store.state = __assign(__assign({}, store.state), newState);
    store.listeners.forEach(function (listener) {
        if (listener.run) {
            listener.run(store.state);
        }
    });
    if (afterUpdateCallback) {
        afterUpdateCallback();
    }
}
function useCustom(store, React, mapState, mapActions) {
    var _a = React.useState(Object.create(null)), originalHook = _a[1];
    var state = mapState ? mapState(store.state) : store.state;
    var actions = React.useMemo(function () { return (mapActions ? mapActions(store.actions) : store.actions); }, [mapActions, store.actions]);
    React.useEffect(function () {
        var newListener = { oldState: {} };
        newListener.run = mapState
            ? function (newState) {
                var mappedState = mapState(newState);
                if (mappedState !== newListener.oldState) {
                    newListener.oldState = mappedState;
                    originalHook(mappedState);
                }
            }
            : originalHook;
        store.listeners.push(newListener);
        if (newListener.run) {
            newListener.run(store.state);
        }
        return function () {
            store.listeners = store.listeners.filter(function (listener) { return (listener) !== newListener; });
        };
    }, []); // eslint-disable-line
    return [state, actions];
}
function associateActions(_a) {
    var store = _a.store, actions = _a.actions;
    var associatedActions = {};
    Object.keys(actions).forEach(function (key) {
        if (typeof actions[key] === "function") {
            // @ts-ignore
            associatedActions[key] = actions[key].bind(null, store);
        }
        if (typeof actions[key] === "object") {
            // @ts-ignore
            associatedActions[key] = associateActions({
                actions: actions[key],
                store: store,
            });
        }
    });
    return associatedActions;
}
var useHookz = function (React, initialState, actions, initializer) {
    var store = { state: initialState, listeners: [] };
    store.setState = setState.bind(null, store);
    store.actions = associateActions({ store: store, actions: actions });
    if (initializer) {
        initializer(store);
    }
    return useCustom.bind(null, store, React);
};
export default useHookz;
//# sourceMappingURL=index.js.map