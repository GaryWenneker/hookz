# React-Hookz

[![Build Status](https://travis-ci.com/garywenneker/react-hookz.svg?branch=master)](https://travis-ci.com/garywenneker/react-hookz)
[![npm version](https://badge.fury.io/js/react-hookz.svg)](https://badge.fury.io/js/react-hookz)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hookz)](https://bundlephobia.com/result?p=react-hookz)

React Global Hookz, a simple global state for React with the Hooks API in less than 1kb.

---

Table of Contents

- [Install](#installation)
- [Using TypeScript](#using-typescript)
- [Usage](#usage)
- [Bug fixes](#bug-fixes)

### Installation

```
npm install --save react-hookz
```

### Using TypeScript

Install the TypeScript definitions from DefinitelyTyped

```
npm install @types/react-hookz
```

## Usage

### Minimal example:

#### Actions

```javascript
export const addToCounter = (store: any, amount: number) => {
  const counter = store.state.counter + amount;
  store.setState({ counter });
};
```

#### HOC

```javascript
import React from "react";
import ReactHookz from "react-hookz";

import * as actions from "../actions/index";

export interface GlobalState {
  counter: number;
}
const initialState: GlobalState = {
  counter: 1
};

const useReactHookz = ReactHookz(React, initialState, actions);
export const connect = Component => {
  return props => {
    let [state, actions] = useReactHookz();
    let _props = { ...props, state, actions };
    return <Component {..._props} />;
  };
};

export default useReactHookz;
```

#### Component

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

## Examples

- [TypeScript-aware React hooks for global state using a HOC](https://codesandbox.io/s/react-hookz-hoc-112fy)

## Bug Fixes 🐛
