# React-Hookz

[![Build Status](https://travis-ci.com/garywenneker/react-hookz.svg?branch=master)](https://travis-ci.com/garywenneker/react-hookz)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/GaryWenneker/react-hookz.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/GaryWenneker/react-hookz/context:javascript)
[![npm version](https://badge.fury.io/js/react-hookz.svg)](https://badge.fury.io/js/react-hookz)
[![install size](https://packagephobia.now.sh/badge?p=react-hookz)](https://packagephobia.now.sh/result?p=react-hookz)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hookz)](https://bundlephobia.com/result?p=react-hookz)
[![downloads](https://img.shields.io/npm/dt/react-hookz.svg)](https://img.shields.io/npm/dt/react-hookz.svg)
[![](https://david-dm.org/GaryWenneker/react-hookz.svg)](https://david-dm.org/GaryWenneker/react-hookz.svg)

![react-hookz](https://user-images.githubusercontent.com/6793205/71441931-ee9eef80-2703-11ea-8737-d73146179627.png)

React Global Hookz, a simple global state for React with the Hooks API in less than 1kb written in TypeScript

---

Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)

### Installation

```
npm install react-hookz
```

## Usage

### Minimal example:

#### Actions

```javascript
export interface IActions {
  addToCounter: (amount: number) => void;
}

export interface IState {
  counter: number;
}

export interface IStore {
  state: IState;
  setState: (state: any) => void;
}

export const addToCounter = (store: IStore, amount: number) => {
  const counter = store.state.counter + amount;
  store.setState({ counter });
};

export default { addToCounter };
```

#### HOC

```javascript
import React from "react";
import ReactHookz from "react-hookz";
import actions from "../actions";

export interface IState {
  counterA: number;
  counterB: number;
  postcode?: string;
}

const initialState: IState = {
  counterA: 1,
  counterB: 1,
  postcode: "3991"
};

const useReactHookz = ReactHookz(React, initialState, actions);

/**
 * Connect allows you to use the React Hookz functionality from a higher ordered component.
 * All properties and state will be avalibale.
 * @param Component Your component
 * @example connect(MyComponent);
 * @see https://github.com/GaryWenneker/react-hookz
 */
export const connect = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return props => {
    let [state, actions] = useReactHookz();
    let _props = { ...props, state, actions };
    return <Component {..._props as P} />;
  };
};

export default useReactHookz;

```

#### Component

##### Using a HOC

```javascript
import React from "react";
import { connect } from "../store";

interface Props {
  state: any;
  actions: any;
}

const Counter: React.FC<Props> = props => {
  const { state, actions } = props;
  return (
    <div className="Counter">
      <p>
        FC Counter:
        {state.counter}
      </p>
      <button type="button" onClick={() => actions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};

export default connect(Counter);
```

##### Using in a Function Component

```javascript
import React from "react";
import ReactHookz from "react-hookz";
import { renderTime } from "../utils/index";
import Actions, { IState, IActions } from "../actions";

const initialState: IState = {
  counter: 1
};

const useReactHookz = ReactHookz(React, initialState, Actions);

const Counter: React.FC = () => {
  // using ReactHookz
  const [globalState, globalActions]: [IState, IActions] = useReactHookz();
  return (
    <div className="Counter">
      <p>
        FC Counter:
        {globalState.counter}
      </p>
      <button type="button" onClick={() => globalActions.addToCounter(1)}>
        +1 to global
      </button>
      <p>FC Counter {renderTime()}</p>
    </div>
  );
};

export default Counter;
```

## Examples

- [React Hookz minimal example (like usage above)](https://codesandbox.io/s/react-hookz-global-state-vl5x7)
- [React Hookz HOC](https://codesandbox.io/s/react-hookz-hoc-112fy)
- [React Hookz Fetch Action](https://codesandbox.io/s/react-hookz-fetch-action-demo-ellw3)
- [Using React Hookz in a class component](https://codesandbox.io/s/react-hookz-class-component-hfimj)
