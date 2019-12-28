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
declare const useHookz: (React: any, initialState: any, actions: any, initializer?: any) => (mapState: any, mapActions: any) => any[];
export default useHookz;
//# sourceMappingURL=index.d.ts.map