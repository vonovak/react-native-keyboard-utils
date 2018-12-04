## react-native-keyboard-utils

This is a simple package that offers some useful utility components related to keyboard.

### Installation

`yarn add react-native-keyboard-utils`

### Usage

`import { HideWithKeyboard, ShowWithKeyboard, KeyboardListener, withKeyboardState } from 'react-native-keyboard-utils';`

See example at the bottom.

#### `ShowWithKeyboard`

Use this component to render content when keyboard is shown.

#### `HideWithKeyboard`

Use this component to hide content when keyboard is shown.

#### `KeyboardListener`

Use this component to register for keyboard events. The component handles event registration and cleanup for you.

Supported props are the following callbacks which will be called when the corresponding event happens:

- `onWillShow`
- `onWillHide`
- `onDidShow`
- `onDidHide`
- `onWillChangeFrame`
- `onDidChangeFrame`

#### `withKeyboardState`

A HOC that will pass a `isKeyboardShown` prop to the wrapped component. You can use it to react to keyboard state, eg: `const YourComponentThatReactsToKeyboard = withKeyboardState(YourComponent);`. `ShowWithKeyboard` and `HideWithKeyboard` are implemented using this HOC.

It accepts two props of type string: `keyboardShownEvent` and `keyboardHiddenEvent`, which are the names of events that the component will consider as "shown event" and "hidden event". By default, those values are (keep in mind `keyboardWill*` events are not supported on android):

```js
ios: {
  keyboardShownEvent: 'keyboardWillShow',
  keyboardHiddenEvent: 'keyboardWillHide',
},
android: {
  keyboardShownEvent: 'keyboardDidShow',
  keyboardHiddenEvent: 'keyboardDidHide',
},
```

The HOC forwards the `ref` to the wrapped component.

### Example

```js
import { HideWithKeyboard, ShowWithKeyboard, KeyboardListener } from 'react-native-keyboard-utils';

export default class App extends React.Component {
  state = {
    text: 'type here',
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 50, width: 190, backgroundColor: 'pink' }}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <KeyboardListener
          onDidShow={event => {
            // do something
          }}
        />
        <ShowWithKeyboard>
          <Text>this is *shown* when the keyboard is shown</Text>
        </ShowWithKeyboard>
        <HideWithKeyboard>
          <Text>this is *hidden* when the keyboard is shown</Text>
        </HideWithKeyboard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
