
Allows declarative event listeners for global events on react components. Inspired by [this comment][1]

[1]: https://github.com/facebook/react/issues/285#issuecomment-137224986

## Install

```
npm install --save react-global-event-method
```

## Usage

The arguments are `onGlobalEvent(eventName, eventTarget=window, useCapture=false)`.
Cleanup is done for you, and you may register multiple handlers and multiple events per handler.

```js
import onGlobalEvent from 'react-global-event-method';

class MyComponent extends React.Component {
  @onGlobalEvent('click')
  handleGlobalClick(event){
    this.setState(...);
  }

  render(){
    // ...
  }
}

```

## NOTE!

If you declare componentDidMount or componentWillUnmount they **must** be **above** any @onGlobalEvent listeners.

