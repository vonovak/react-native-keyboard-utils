import React from 'react';
import { Keyboard, Platform } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';

export function withKeyboardState(WrappedComponent) {
  class ComponentWithKeyboardState extends React.Component {
    static defaultProps = Platform.select({
      ios: {
        keyboardShownEvent: 'keyboardWillShow',
        keyboardHiddenEvent: 'keyboardWillHide',
      },
      android: {
        keyboardShownEvent: 'keyboardDidShow',
        keyboardHiddenEvent: 'keyboardDidHide',
      },
    });

    constructor(props) {
      super(props);
      this.state = {
        isKeyboardShown: false,
      };
    }

    componentDidMount() {
      const { keyboardShownEvent, keyboardHiddenEvent } = this.props;
      this.keyboardShownListener = Keyboard.addListener(keyboardShownEvent, this._onKeyboardShown);
      this.keyboardHiddenListener = Keyboard.addListener(
        keyboardHiddenEvent,
        this._onKeyboardHidden
      );
    }

    componentWillUnmount() {
      this.keyboardShownListener.remove();
      this.keyboardHiddenListener.remove();
    }

    _onKeyboardShown = () => {
      this.setState({
        isKeyboardShown: true,
      });
    };

    _onKeyboardHidden = () => {
      this.setState({
        isKeyboardShown: false,
      });
    };

    render() {
      const { keyboardShownEvent, keyboardHiddenEvent, forwardedRef, ...rest } = this.props;
      return (
        <WrappedComponent
          ref={forwardedRef}
          {...rest}
          isKeyboardShown={this.state.isKeyboardShown}
        />
      );
    }
  }

  const WithHoistedStatics = hoistStatics(ComponentWithKeyboardState, WrappedComponent);

  function forwardRef(props, ref) {
    return <WithHoistedStatics {...props} forwardedRef={ref} />;
  }
  forwardRef.displayName = `withKeyboardState(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return React.forwardRef(forwardRef);
}

function _HideWithKeyboard({ children, isKeyboardShown }) {
  return isKeyboardShown ? null : children;
}
export const HideWithKeyboard = withKeyboardState(_HideWithKeyboard);

function _ShowWithKeyboard({ children, isKeyboardShown }) {
  return isKeyboardShown ? children : null;
}
export const ShowWithKeyboard = withKeyboardState(_ShowWithKeyboard);
