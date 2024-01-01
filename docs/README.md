# Documentation

## Table of Contents

1. [useNetworkState](#usenetworkstate)
2. [useCopyPaste](#usecopypaste)
3. [useDarkMode](#usedarkmode)
4. [useLocalStorage](#uselocalstorage)
5. [useFetch](#usefetch)
6. [useClickOutside](#useclickoutside)
7. [useCounter](#usecounter)
8. [useIsFetching](#useisfetching)
9. [useCookies](#usecookies)
10. [useHover](#usehover)
11. [useMediaQuery](#usemediaquery)
12. [useIsClient](#useisclient)
13. [useTitle](#usetitle)
14. [useDebounce](#usedebounce)
15. [useKeyPress](#usekeypress)
16. [useRenderCount](#userendercount)
17. [useIsFirstRender](#useisfirstrender)
18. [useOrientation](#useorientation)
19. [useDevice](#usedevice)
20. [useLocation](#uselocation)
21. [useStack](#usestack)
22. [useList](#uselist)
23. [useQueue](#usequeue)
24. [useCountDown](#usecountdown)
25. a little bit of creativity [useEventListener](#useeventlistener)

</br>

## 💾 useLocalStorage

Custom useState hook which saves the state value in localStorage

### Usage

```jsx
import React from "react";
import { useLocalStorage } from "use-custom-hooks";

const LocalValue = () => {
  const [username, setUserName] = useLocalStorage("john_doe", "username");
  /*
   If username exists in localStorage, the value of username state will be
   localStorage.getItem("username"). If username doesn't exist in localStorage, 
   the value of the state will be "john-doe" and a new item will be created in
   localStorage will key "username"
  */

  return <span>Value from localstorage is {username}</span>;
};
```

### Parameters

1. `initialValue` (_any_) : Initial value of the state.
2. `key` (_String_) : Key for the localStorage.

### Return value

`[state,setState]`

1. `state` (_any_) : The created state.
2. `setState` (_function_) : Function to change the state value.

</br>

## 📱 useMediaQuery

Custom hook which listens for a media query and updates the state when the query is active/inactive

### Usage

```jsx
import React from "react";
import { useMediaQuery } from "use-custom-hooks";

const BottomNav = () => {
  const isMobileDevice = useMediaQuery("(max-width:600px)");
  /*
   isMobileDevice will be true when the screen size is less than
   600px, and false otherwise
  */

  // Component will only be rendered in mobile devices
  return isMobileDevice ? <div className="bottom-nav"></div> : null;
};
```

### Parameters

1. `mediaQuery` (_String_) : The media query to listen to.

### Return value

1. `isMediaQueryActive` (_any_) : A boolean state denoting if the media query is active or not

</br>

## 📃 useForm

Custom hook to create controlled form component.

### Usage

```jsx
import React from "react";
import { useForm } from "use-custom-hooks";

const Form = () => {
  const [values, onChange] = useForm({ name: "", age: 12 });

  return (
    <form>
      <input type="text" name="name" value={values.name} onChange={onChange} />
      <input type="number" name="age" value={values.age} onChange={onChange} />
    </form>
  );
};
```

### Parameters

1. `initialValue` (_Object_) : State object with name of each form input as keys and corresponding initial state as values.

### Return value

`[values,onChange]`

1. `values` (_Object_) : Values of input components.
2. `onChange` (_function_) : Function to be added to onChange event of input component.

</br>

## 📚 useStack

Hook for creating and managing Stack.

### Usage

```jsx
import React from "react";
import { useStack } from "use-custom-hooks";

const LocalValue = () => {
  const [stack, push, pop] = useStack([]);
  /*
    Returns an array with stack itself, push and pop functions.
  */

  const generateStackSpan = () => stack.map((x) => <span>{x} </span>);

  return (
    <div>
      <h1>The stack contains: {generateStackSpan()}</h1>
      <button onClick={pop}>Pop</button>
      {/* Removes last element from stack */}
      <button onClick={() => push(1)}>Push</button>
      {/* Adds one to the end of the stack */}
    </div>
  );
};
```

### Parameters

1. `initialValue` (_Array_) : Initial value of the stack.

### Return value

`[stack,push,pop]`

1. `stack` (_Array_) : The created stack.
2. `push` (_function_) : Function to add an element to the end of the stack.
3. `pop` (_function_) : Function to remove last element from the stack.

</br>

## 🛒 useQueue

Very similar to useStack, this hook creates and manages queues.

### Usage

```jsx
import React from "react";
import { useQueue } from "use-custom-hooks";

function Queue() {
  const [queue, enqueue, dequeue] = useQueue([]);
  const generateNumber = () => Math.round(Math.random() * 100);
  return (
    <div>
      <h1>{queue.map((item) => ` ${item} `)}</h1>
      <button onClick={() => enqueue(generateNumber())}>Enqueue</button>
      <button onClick={dequeue}>Dequeue</button>
    </div>
  );
}
```

### Parameters

1. `initialValue` (_Array_) : Initial value of the queue.

### Return value

`[queue,enqueue,dequeue]`

1. `queue` (_Array_) : The created queue.
2. `enqueue` (_function_) : Function to add an element to the rear of the queue.
3. `dequeue` (_function_) : Function to remove last element from the queue.

</br>

## 🏀 useDebounce

Convert a normal function to a debounced function.

> Note: More about Debouncing : [here](https://www.geeksforgeeks.org/debouncing-in-javascript/)

### Usage

```jsx
import React from "react";
import { useDebounce } from "use-custom-hooks";

const LocalValue = () => {
  const fetchData = () => {
    //Fetch Data function
  };

  const debouncedFetchData = useDebounce(fetchData, 300);
  /*
   No matter how many times we call this function in 300ms, it will only
   execute once.
  */

  return <div>Lorem Ipsum</div>;
};
```

### Parameters

`[inputFunction,delay]`

1. `inputFunction` (_function_) : Function which is to be modified.
2. `delay` (_number_) : The time delay in milliseconds.

### Return value

`debouncedFunction` (_function_) : The modified function.

</br>

## 🌑 useDarkMode

Let's you toggle dark-mode by adding and removing a className from/to
the body. The user-preference is stored in localStorage.

### Usage

```jsx
import React from "react";
import { useDarkMode } from "use-custom-hooks";

const App = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode("dark");
  /*
    "dark" is the class name to be added to the body.
  */

  return (
    <div>
      <h1>Hello World</div>
      <button onClick={toggleDarkMode}>Toggle Dark-Mode</button>
      {/* The class '.dark' is added to body when dark-mode, and removed when light-mode. */}
    </div>
  );
};
```

### Parameters

`className` (_String_) : Class name which is to be added to body when dark mode.

### Return value

`isDarkMode, darkModeToggle`

1. `isDarkMode` (_boolean_) : State indicating dark mode.
2. `darkModeToggle` (_function_) : Function to toggle dark mode.

</br>

## 🔘 useToggle

Returns a boolean state and a state toggle function.

### Usage

```jsx
import React from "react";
import { useToggle } from "use-custom-hooks";

const Mood = () => {
  const [isHappy, toggleIsHappy] = useToggle(true);
  /*
    If isHappy state is true calling toggleIsHappy function will set
    the isHappy state to false, and vise versa.
  */

  return (
    <div>
      <h1>Hello World</div>
      <p>{`The user is ${isHappy ? "Happy 😃" : "Sad 😢"}`}</p>
      <button onClick={toggleIsHappy}>Toggle</button>
    </div>
  );
};
```

### Parameters

1. `initialValue` (_boolean_) : Initial value of the state.

### Return value

`[state,toggleFunction]`

1. `state` (_boolean_) : The booelan state.
2. `toggleFunction` (_function_) : Function to toggle the state value.

</br>

## 🖱 useMousePosition

Returns an object with the current coordinates of the mouse pointer.

### Usage

```jsx
import React from "react";
import { useMousePointer } from "use-custom-hooks";

const Mouse = () => {
  const { x, y } = useMousePosition();
  /*
    Using Object destructuring to get x & y coordinates
    from mousePosition object.
  */

  return (
    <div>
      <h1>Mouse Pointer Location</div>
      <p>The mouse pointer is at : {`(${x},${y})`}</p>
      {/* The x,y coordinates will be updated as you move your mouse.*/}
    </div>
  );
};
```

### Parameters

None : This hooks takes no parameters.

### Return value

`{x,y}`

1. `x` (_number_) : X Coordinate of the mouse.
2. `y` (_number_) : Y Coordinate of the mouse.

</br>

## 🌎 useGeoLocation

Get latitude and longitude positions from your browser

### Usage

```jsx
import React from "react";
import { useGeoLocation } from "use-custom-hooks";

const Home = () => {
  /*
   * The hook will return you an object like this:
   *
   * {
   *   latitude: 1233234,
   *   longitude: -1234345,
   * }
   *
   */
  const geoLocation = useGeoLocation();

  return (
    <div>
      {geoLocation.latitude}
      {geoLocation.longitude}
    </div>
  );
};
```

### Parameters

None : This hooks takes no parameters.

### Return value

`{latitude, longitude}`

1. `latitude` (_number_) : Latitude coordinate of the user.
2. `longitude` (_number_) : Longitude coordinate of the user.

</br>

## 🕒 usePrevious

Custom hook for retrieving the previous useState value

### Usage

```jsx
import React from "react";
import { usePrevious } from "use-custom-hooks";

function App() {
  // normal usage of useState
  const [visible, setVisible] = useState(false);

  // using the custom usePrevious hook to retrieve the value that was provided in the previous render
  const prevVisibility = usePrevious(visible);

  // Display both current and previous visibility states
  return (
    <div>
      <h1>Current visibility: {visible ? "visible" : "not visible"}</h1>
      <h1>Previous visibility: {prevVisibility ? "visible" : "not visible"}</h1>
      <button onClick={() => setVisible(!visible)}>Toggle Visibility</button>
    </div>
  );
}
```

### Parameters

`presentState` (_any_) : The current value (will be the previous value in the next render).

### Return value

`previousState` (_any_) : The previous state.

</br>

## 📴 useOfflineStatus

Returns a boolean state which represents if the device is offline

### Usage

```jsx
import React from "react";
import { useOfflineStatus } from "use-custom-hooks";

const LocalValue = () => {
  const isDeviceOffline = useOfflineStatus();

  return <p>Device is currently {isDeviceOffline ? "Offline" : "Online"}</p>;
};
```

### Parameters

None : This hooks takes no parameters.

### Return value

`isDeviceOffline` (_boolean_) : A state representing if device is offline.

</br>

## 👆 useClickOutside

Custom hook which listens for a click event happened outside of a component.

### Usage

```jsx
import React from "react";
import { useClickOutside } from "use-custom-hooks";

const CustomButton = () => {
  const { myRef, wasClicked, setWasClicked } = useClickOutside();
  return (
    <div ref={myRef}>
      <button onClick={() => setWasClicked(false)}>
        {wasClicked ? "Not-active" : "Active"}
      </button>
    </div>
  );
};
```

### Parameters

None : This hooks takes no parameters.

### Return value

1. `ref` (**interface RefObject<T> {
   readonly current: T | null;
   }**) : The reference to the DOM element.

2. `wasClicked` (**boolean**) : The value determines, if the component is selected or whether the user clicks outside.

3. `setWasClicked` (**React.Dispatch<React.SetStateAction<boolean>>**) : The dispatcher of the wasClicked state.

</br>

# Contribution Guidelines

Documentation for each hook should follow this template.

## Name

Description goes here.

### Usage

```jsx
//Code Example with comments
```

### Parameters

List the parameters passed to the hook, their type and description as ordered list.

> Note : If the parameter is optional mention it.

### Return value

Specify the value return by the hook, with type and description.
