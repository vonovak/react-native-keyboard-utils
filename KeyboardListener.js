import { Component } from 'react';
import { Keyboard } from 'react-native';

const eventNames = [
  'WillShow',
  'WillHide',
  'DidShow',
  'DidHide',
  'WillChangeFrame',
  'DidChangeFrame',
];

export class KeyboardListener extends Component {
  subscribers = {};

  componentDidMount() {
    eventNames.forEach(eventName => {
      const propName = `on${eventName}`;
      const passedListener = this.props[propName];
      this.registerListenerIfDefined(passedListener, eventName);
    });
  }

  registerListenerIfDefined(listenerFromProps, eventName) {
    if (listenerFromProps) {
      this.subscribers[eventName] = Keyboard.addListener(`keyboard${eventName}`, listenerFromProps);
    }
  }

  componentWillUnmount() {
    Object.keys(eventNames).forEach(eventName => {
      this.removeListener(eventName);
    });
  }

  removeListener(eventName) {
    const subscriber = this.subscribers[eventName];
    subscriber && subscriber.remove();
  }

  componentDidUpdate(prevProps) {
    eventNames.forEach(eventName => {
      const propName = `on${eventName}`;
      const newListener = this.props[propName];
      const oldListener = prevProps[propName];

      if (oldListener !== newListener) {
        this.removeListener(eventName);
        this.registerListenerIfDefined(newListener, eventName);
      }
    });
  }

  render() {
    return null;
  }
}
