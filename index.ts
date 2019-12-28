export interface IHookzListener {
    oldState: any;
    run?: (state: any) => void;
}

export interface IHookzStore {
    state: any;
    actions?: any;
    listeners: IHookzListener[];
    setState?: (newState: any, afterUpdateCallback: any) => void;
}

function setState(store: IHookzStore, newState: any, afterUpdateCallback: any) {
    store.state = { ...store.state, ...newState };
    store.listeners.forEach((listener: IHookzListener) => {
        if (listener.run) {
            listener.run(store.state);
        }
    });
    if (afterUpdateCallback) {
        afterUpdateCallback();
    }
}
function useCustom(
    store: IHookzStore,
    React: any,
    mapState: any,
    mapActions: any,
) {
    const [, originalHook] = React.useState(Object.create(null));
    const state = mapState ? mapState(store.state) : store.state;
    const actions = React.useMemo(
        () => (mapActions ? mapActions(store.actions) : store.actions),
        [mapActions, store.actions],
    );

    React.useEffect(() => {
        const newListener: IHookzListener = { oldState: {} };
        newListener.run = mapState
            ? (newState: any) => {
                const mappedState = mapState(newState);
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
        return () => {
            store.listeners = store.listeners.filter(
                (listener) => (listener) !== newListener,
            );
        };
    }, []); // eslint-disable-line
    return [state, actions];
}

function associateActions({ store, actions }: { store: any; actions: any }) {
    const associatedActions = {};
    Object.keys(actions).forEach((key) => {
        if (typeof actions[key] === "function") {
            // @ts-ignore
            associatedActions[key] = actions[key].bind(null, store);
        }
        if (typeof actions[key] === "object") {
            // @ts-ignore
            associatedActions[key] = associateActions({
                actions: actions[key],
                store,
            });
        }
    });
    return associatedActions;
}

const useHookz = (
    React: any,
    initialState: any,
    actions: any,
    initializer?: any,
) => {
    const store: IHookzStore = { state: initialState, listeners: [] };
    store.setState = setState.bind(null, store);
    store.actions = associateActions({ store, actions });
    if (initializer) {
        initializer(store);
    }
    return useCustom.bind(null, store, React);
};

export default useHookz;
