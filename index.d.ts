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
/**
 * React Global Hookz, a simple global state for React with the Hooks API in less than 1kb written in TypeScript
 * @param React The imported namespace of your installed React version
 * @param initialState Any state object you'd like to use
 * @param actions An object of functions setting the state
 * @param initializer Optional initialization function
 * @see https://github.com/GaryWenneker/react-hookz
 */
declare const useHookz: (React: any, initialState: any, actions: any, initializer?: any) => (mapState: any, mapActions: any) => any[];
export default useHookz;
//# sourceMappingURL=index.d.ts.map