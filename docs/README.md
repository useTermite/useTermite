# Documentation

## Table of Contents

1. [useNetworkState](#-usenetworkstate)
2. [useCopyPaste](#-usecopypaste)
3. [useDarkMode](#-usedarkmode)
4. [useLocalStorage](#-uselocalstorage)
5. [useFetch](#-usefetch)
6. [useClickOutside](#-useclickoutside)
7. [useCounter](#-usecounter)
8. [useCookies](#-usecookies)
9. [useIsHovered](#-useIsHovered)
10. [useMediaQuery](#-usemediaquery)
11. [useIsClient](#-useisclient)
12. [useTitle](#-usetitle)
13. [useKeyPress](#-usekeypress)
14. [useRenderCount](#-userendercount)
15. [useIsFirstRender](#-useisfirstrender)
16. [useOrientation](#-useorientation)
17. [useDevice](#-usedevice)
18. [useLocation](#-uselocation)
19. [useStack](#-usestack)
20. [useList](#-uselist)
21. [useQueue](#-usequeue)
22. [useCountDown](#-usecountdown)
23. a little bit of creativity [useEventListener](#-useeventlistener)

</br>

## 🌐 useNetworkState

Custom hook to track the network state of the user's device, providing information on whether the device is online or offline.

### Usage

```jsx
import React from 'react'
import { useNetworkState } from 'use-termite'

const NetworkStatus = () => {
  const { isOnline, state } = useNetworkState()
  /*
    If the user is connected to the internet, isOnline will be true and state will be 'online'.
    Otherwise, isOnline will be false and state will be 'offline'.
  */

  return (
    <div>
      <p>Network status: {state}</p>
      <p>{isOnline ? 'You are Online' : 'You are Offline'}</p>
    </div>
  )
}
```

### Parameters

None.

### Return value

`{isOnline, state}`

1. `isOnline` (_boolean_) : A boolean value indicating whether the user is online or not.
2. `state` (_String_) : A string representing the current network state, either 'online' or 'offline'.

</br>

## 📋 useCopyPaste

Custom hook to provide functionalities to copy text to the clipboard and paste from it. It returns an object containing two functions: `copy` for copying text to the clipboard and `paste` for retrieving text from the clipboard.

### Usage

```jsx
import React, { useState } from 'react'
import { useCopyPaste } from 'use-termite'

const CopyPasteComponent = () => {
  const { copy, paste } = useCopyPaste()
  const [text, setText] = useState('')
  const [clipboardContent, setClipboardContent] = useState('')

  const handleCopy = async () => {
    await copy(text)
    alert(`Copied: ${text}`)
  }

  const handlePaste = async () => {
    const text = await paste()
    setClipboardContent(text)
  }

  return (
    <div>
      <input type='text' value={text} onChange={e => setText(e.target.value)} placeholder='Type here to copy' />
      <button onClick={handleCopy}>Copy to Clipboard</button>
      <button onClick={handlePaste}>Paste from Clipboard</button>
      <p>Pasted content: {clipboardContent}</p>
    </div>
  )
}
```

### Parameters

None.

### Return value

`{copy, paste}`

1. `copy` (_function_): A function that takes a string as an argument and copies it to the clipboard.
2. `paste` (_function_): A function that retrieves text from the clipboard and returns it.

</br>

## 🌗 useDarkMode

Custom hook to toggle dark mode in your application. It integrates seamlessly with Tailwind CSS, enabling you to switch between dark and light themes effectively. The hook provides a `toggle` function to switch modes and a `mode` state indicating the current mode.

### Usage

```jsx
import React from 'react'
import { useDarkMode } from 'use-termite'

const ThemeToggler = () => {
  const { mode, toggle } = useDarkMode()

  return (
    <div className={mode === 'dark' ? 'dark' : ''}>
      <div className='bg-white dark:bg-black text-black dark:text-white'>
        <h1>This is a {mode} mode example</h1>
        <button onClick={toggle}>Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode</button>
      </div>
    </div>
  )
}
```

This component uses Tailwind CSS classes to demonstrate how you might apply the dark mode in your application. The `dark` class is conditionally applied to the top-level `div` based on the current mode. Tailwind CSS will handle the rest, applying the appropriate styles when the `dark` class is present.

### Parameters

None.

### Return value

`{ mode, toggle }`

1. `mode` (_string_): The current theme mode ('dark' or 'light').
2. `toggle` (_function_): A function to toggle between dark and light modes.

</br>

## 💾 useLocalStorage

Custom hook that simplifies interacting with the browser's localStorage. It works similarly to `useState` but stores and retrieves the state from localStorage, ensuring data persistence across sessions.

### Usage

```jsx
import React from 'react'
import { useLocalStorage } from 'use-termite'

const LocalStorageComponent = () => {
  const [username, setUsername] = useLocalStorage('username', 'JohnDoe')
  /*
    If 'username' exists in localStorage, the value of the 'username' state 
    will be localStorage.getItem('username'). If 'username' doesn't exist in 
    localStorage, the value of the state will be 'JohnDoe', and a new item will
    be created in localStorage with key 'username'.
  */

  const handleChange = event => {
    setUsername(event.target.value)
  }

  return (
    <div>
      <input type='text' value={username} onChange={handleChange} />
      <p>Username is {username}</p>
    </div>
  )
}
```

In this example, `useLocalStorage` is used to keep track of a 'username'. The hook initializes the 'username' state from localStorage if available, otherwise sets it to a default value ('JohnDoe'). When the username is updated via `setUsername`, the new value is also saved to localStorage.

### Parameters

1. `key` (_String_): The key under which to store the value in localStorage.
2. `initialValue` (_any_): Initial value for the state if not already set in localStorage.

### Return value

`[value, setValue]`

1. `value` (_any_): The current state value retrieved from localStorage or the initial value.
2. `setValue` (_function_): Function to update the state value and simultaneously update the corresponding localStorage item.

</br>

## 🔲 useClickOutside

Custom hook to detect clicks outside a specified DOM element. It's useful for handling scenarios like closing a modal or dropdown menu when the user clicks outside of it.

### Usage

```jsx
import React, { useRef } from 'react'
import { useClickOutside } from 'use-termite'

const Modal = ({ onClose }) => {
  const modalRef = useRef()

  useClickOutside(modalRef, () => {
    // This function is called when a click is detected outside the modalRef element
    onClose()
  })

  return (
    <div ref={modalRef}>
      <p>This is a modal! Click outside to close.</p>
    </div>
  )
}

const App = () => {
  const [isModalOpen, setModalOpen] = React.useState(false)

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
```

In this example, `useClickOutside` is used to detect a click outside of the `Modal` component. When the click is detected, the `onClose` callback is called, which updates the state in the parent `App` component and closes the modal.

### Parameters

1. `ref` (_React.RefObject_): A ref object pointing to the element to detect outside clicks for.
2. `handler` (_function_): A function to execute when a click outside the specified element is detected.

### Return value

None.

</br>

## 🔢 useCounter

Custom hook that creates a counter with the ability to increment and decrement its value. It's initialized with a number and returns an object containing functions to increase and decrease the count, as well as the current count itself.

### Usage

```jsx
import React from 'react'
import { useCounter } from 'use-termite'

const CounterComponent = () => {
  const { up, down, amount } = useCounter(10) // Initialize counter with 10
  /*
    'up' will increment the counter,
    'down' will decrement the counter,
    and 'amount' will be the current value of the counter.
  */

  return (
    <div>
      <p>Count: {amount}</p>
      <button onClick={up}>Increase</button>
      <button onClick={down}>Decrease</button>
    </div>
  )
}
```

In this example, `useCounter` is used to keep track of a count value. The counter is initialized with a value of 10. The `up` function increments the count, the `down` function decrements it, and `amount` reflects the current count.

### Parameters

1. `initialValue` (_number_): The initial count value.

### Return value

`{ up, down, amount }`

1. `up` (_function_): A function to increment the counter.
2. `down` (_function_): A function to decrement the counter.
3. `amount` (_number_): The current count value.

</br>

To create a document for the custom hook `useIsHovered`, you would follow a similar structure as the `useEventListener` example provided. Here's how you might structure it:

---

## 🔊 useIsHovered

Custom hook to determine if the mouse is hovering over a specified element. It accepts a ref to the element and a callback function that receives the hover state. This hook is useful for UI interactions that depend on the hover state of an element, such as changing styles or displaying tooltips.

### Usage

```jsx
import React, { useRef } from 'react'
import { useIsHovered } from 'use-your-hooks-package'

const HoverComponent = () => {
  const divRef = useRef(null)
  const isHovered = useIsHovered(divRef, hoverState => {
    console.log(`Is hovered: ${hoverState}`)
  })

  return (
    <div ref={divRef} style={{ width: '200px', height: '200px', background: isHovered ? 'blue' : 'red' }}>
      Hover over me!
    </div>
  )
}
```

In this example, `useIsHovered` is used to determine if the `div` element is being hovered over. The background color of the `div` changes based on the hover state, and the hover state is logged to the console.

### Parameters

1. `ref` (_React.RefObject<HTMLElement>_): A ref object pointing to the DOM element to detect hovers for.
2. `onHoverChange` (_function_): A callback function that receives the hover state (true or false).

### Return value

- **Boolean**: A boolean value indicating whether the element is currently being hovered.

</br>

Here's the documentation for a custom hook called `useCookies`. This hook is designed to simplify interactions with browser cookies. It provides functions to get, set, and delete cookies.

## 🍪 useCookies

Custom hook to interact with browser cookies, providing methods to get, set, and delete cookies.

### Usage

```jsx
import React, { useState } from 'react'
import { useCookies } from 'use-termite'

const CookieComponent = () => {
  const { getCookie, setCookie, deleteCookie } = useCookies()
  const [cookieValue, setCookieValue] = useState('')

  const handleSetCookie = () => {
    setCookie('user', 'JohnDoe', { path: '/', maxAge: 3600 })
    alert('Cookie set')
  }

  const handleGetCookie = () => {
    const value = getCookie('user')
    setCookieValue(value)
  }

  const handleDeleteCookie = () => {
    deleteCookie('user')
    alert('Cookie deleted')
  }

  return (
    <div>
      <button onClick={handleSetCookie}>Set Cookie</button>
      <button onClick={handleGetCookie}>Get Cookie</button>
      <button onClick={handleDeleteCookie}>Delete Cookie</button>
      <p>Cookie Value: {cookieValue}</p>
    </div>
  )
}
```

In this example, `useCookies` is used to set, get, and delete a cookie named 'user'. The user can interact with cookies through the buttons.

### Parameters

None.

### Return value

`{ getCookie, setCookie, deleteCookie }`

1. `getCookie` (_function_): Retrieves the value of a specified cookie.
2. `setCookie` (_function_): Sets a cookie with a name, value, and optional settings (like path and max-age).
3. `deleteCookie` (_function_): Deletes a specified cookie.

</br>

## 📐 useMediaQuery

Custom hook to evaluate and respond to CSS media queries. It returns a boolean value indicating whether the document currently matches the provided media query string. This is particularly useful for conditional rendering based on the device's screen size or other media features.

### Usage

```jsx
import React from 'react'
import { useMediaQuery } from 'use-termite'

const ResponsiveComponent = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  const isMediumDevice = useMediaQuery('only screen and (min-width : 769px) and (max-width : 992px)')
  const isLargeDevice = useMediaQuery('only screen and (min-width : 993px) and (max-width : 1200px)')
  const isExtraLargeDevice = useMediaQuery('only screen and (min-width : 1201px)')

  return (
    <div>
      {isSmallDevice && <p>You are on a small device.</p>}
      {isMediumDevice && <p>You are on a medium device.</p>}
      {isLargeDevice && <p>You are on a large device.</p>}
      {isExtraLargeDevice && <p>You are on an extra large device.</p>}
    </div>
  )
}
```

In this example, `useMediaQuery` is used to determine the size of the device based on the screen width. It conditionally renders text based on the current device size. This is useful for creating responsive designs that adapt to different screen sizes.

### Parameters

1. `query` (_String_): The media query string to evaluate.

### Return value

`isMatching` (_boolean_): A boolean value indicating whether the document currently matches the provided media query.

</br>

## 💻 useIsClient

Custom hook to determine if the code is running in a client environment (i.e., in a browser) where the `window` object is available. This is particularly useful for avoiding errors during server-side rendering when using frameworks like Next.js.

### Usage

```jsx
import React from 'react'
import { useIsClient } from 'use-termite'

const ClientCheckerComponent = () => {
  const isClient = useIsClient()

  return <div>{isClient ? <p>This is running in the client.</p> : <p>This is running on the server.</p>}</div>
}
```

In this example, `useIsClient` is used to check if the code is running in a client environment. It conditionally renders a message based on whether the code is running on the server or in the client. This can help you avoid trying to use browser-specific features during server-side rendering.

### Parameters

None.

### Return value

`isClient` (_boolean_): A boolean value indicating whether the code is running in a client environment where the `window` object is available.

</br>

## 🏷️ useTitle

Custom hook to dynamically set the document title. It's a simple and effective way to update the browser's title based on the current page or state in your React application.

### Usage

```jsx
import React, { useEffect } from 'react'
import { useTitle } from 'use-termite'

const TitleComponent = ({ title }) => {
  useTitle(title)

  return <div>Check the document title!</div>
}

const App = () => {
  return <TitleComponent title='Welcome to the useTitle Hook!' />
}
```

In this example, `useTitle` is used to set the document's title to a specified string. When the component is rendered, the document title will update to "Welcome to the useTitle Hook!".

### Parameters

1. `title` (_String_): The new title you want to set for the document.

### Return value

None. The hook directly sets the document's title.

</br>

## ⌨️ useKeyPress

Custom hook that listens for a specific key press and executes a callback function when that key is pressed. This is particularly useful for adding keyboard shortcuts or navigation to your application.

### Usage

```jsx
import React from 'react'
import { useKeyPress } from 'use-termite'

const KeyPressComponent = () => {
  // Define the callback function
  const handleEnterPress = () => {
    console.log('Enter key is pressed!')
  }

  // Use the useKeyPress hook
  useKeyPress('Enter', handleEnterPress)

  return <div>Press the Enter key and check the console!</div>
}
```

In this example, `useKeyPress` is used to listen for the 'Enter' key press. When the 'Enter' key is pressed, the `handleEnterPress` callback function is executed, logging a message to the console.

### Parameters

1. `keyName` (_String_): The name of the key to listen for. It should match the value of `KeyboardEvent.key`. For example, "Enter", "Escape", "ArrowUp", etc.
2. `callback` (_function_): The function to execute when the specified key is pressed.

### Return value

None. The hook directly sets up the event listener and calls the provided callback.

</br>

## 🔄 useRenderCount

Custom hook to count and log the number of times a component has re-rendered. This can be particularly useful during development for performance optimization, helping to identify unnecessary re-renders.

### Usage

```jsx
import React from 'react'
import { useRenderCount } from 'use-termite'

const MyComponent = () => {
  useRenderCount('MyComponent')

  return <div>Check the console to see the render count!</div>
}
```

In this example, `useRenderCount` is used to track how many times `MyComponent` has been re-rendered. Each time the component renders, the count will increase and the current count will be logged to the console with the component's name.

### Parameters

1. `componentName` (_String_): The name of the component to display in the log alongside the render count.

### Return value

None. The hook directly logs the render count to the console each time the component renders.

</br>

## 🎬 useIsFirstRender

Custom hook to determine if the current render is the first render of the component. This can be useful for running effects or other logic only after the initial render.

### Usage

```jsx
import React from 'react'
import { useIsFirstRender } from 'use-termite'

const Component = () => {
  const isFirstRender = useIsFirstRender()

  if (isFirstRender) {
    console.log('This is the first render!')
  } else {
    console.log('Subsequent render.')
  }

  return <div>{isFirstRender ? 'First Render' : 'Not First Render'}</div>
}
```

In this example, `useIsFirstRender` is used to check if the component is rendering for the first time. It logs a message to the console indicating whether it's the first or a subsequent render and displays a text in the component accordingly.

### Parameters

None.

### Return value

`isFirstRender` (_boolean_): A boolean value indicating whether the current render is the first render of the component.

</br>

## 🔄 useOrientation

Custom hook to determine and track the orientation of the user's device. It provides a boolean for portrait and landscape orientation, along with a state string that indicates the current orientation.

### Usage

```jsx
import React from 'react'
import { useOrientation } from 'use-termite'

const OrientationComponent = () => {
  const { isPortrait, isLandscape, state } = useOrientation()

  return (
    <div>
      <p>Current orientation is: {state}</p>
      <p>{isPortrait ? 'You are in Portrait mode.' : 'You are not in Portrait mode.'}</p>
      <p>{isLandscape ? 'You are in Landscape mode.' : 'You are not in Landscape mode.'}</p>
    </div>
  )
}
```

In this example, `useOrientation` is used to determine the current orientation of the device. It sets the `state` to either "portrait" or "landscape", and updates the `isPortrait` and `isLandscape` booleans accordingly.

### Parameters

None.

### Return value

`{ isPortrait, isLandscape, state }`

1. `isPortrait` (_boolean_): A boolean value indicating whether the device is currently in portrait mode.
2. `isLandscape` (_boolean_): A boolean value indicating whether the device is currently in landscape mode.
3. `state` (_String_): A string representing the current orientation state, either "portrait" or "landscape".

</br>

## 📱 useDevice

Custom hook to determine and track the type of device based on screen width. It categorizes the device as mobile, tablet, or desktop and provides both a state string and booleans for each device type.

### Usage

```jsx
import React from 'react'
import { useDevice } from 'use-termite'

const DeviceComponent = () => {
  const { state, isMobile, isTablet, isDesktop } = useDevice()

  return (
    <div>
      <p>Your current device type is: {state}</p>
      <p>{isMobile ? 'You are using a Mobile device.' : ''}</p>
      <p>{isTablet ? 'You are using a Tablet device.' : ''}</p>
      <p>{isDesktop ? 'You are using a Desktop device.' : ''}</p>
    </div>
  )
}
```

In this example, `useDevice` is used to determine and display the type of device based on the screen width. It sets the `state` to "mobile", "tablet", or "desktop" and updates the corresponding boolean values accordingly.

### Parameters

None.

### Return value

`{ state, isMobile, isDesktop, isTablet }`

1. `state` (_String_): A string representing the current device type, either "mobile", "tablet", or "desktop".
2. `isMobile` (_boolean_): A boolean value indicating whether the device is a mobile.
3. `isTablet` (_boolean_): A boolean value indicating whether the device is a tablet.
4. `isDesktop` (_boolean_): A boolean value indicating whether the device is a desktop.

</br>

## 📍 useLocation

Custom hook to get the user's current geographical location using the browser's Geolocation API. It provides the latitude, longitude, and a status message indicating the state of the location retrieval process.

### Usage

```jsx
import React from 'react'
import { useLocation } from 'use-termite'

const LocationComponent = () => {
  const { latitude, longitude, status } = useLocation()

  return (
    <div>
      <p>Status: {status}</p>
      {latitude && longitude ? (
        <p>
          Your current location: Latitude {latitude}, Longitude {longitude}
        </p>
      ) : null}
    </div>
  )
}
```

In this example, `useLocation` is used to retrieve and display the user's current latitude and longitude. It also shows the status of the location retrieval, which can be useful for handling permissions or errors.

### Parameters

None.

### Return value

`{ latitude, longitude, status }`

1. `latitude` (_number | null_): The current latitude of the user or null if not available.
2. `longitude` (_number | null_): The current longitude of the user or null if not available.
3. `status` (_String_): A message indicating the current status of the location retrieval.

</br>

## 💾 useStack

Custom hook that provides a convenient way to interact with a stack data structure within your React components. It offers a variety of methods to manipulate the stack, similar to a standard stack implementation but with React state management integrated. This ensures your component re-renders when the stack changes.

### Usage

```jsx
import React from 'react'
import { useStack } from 'use-termite'

const StackComponent = () => {
  const { stack, push, pop, clear, isEmpty, peek, printStack, size } = useStack(['initial', 'values'])

  const handlePush = () => {
    push('New Item')
  }

  const handlePop = () => {
    pop()
  }

  return (
    <div>
      <button onClick={handlePush}>Push</button>
      <button onClick={handlePop} disabled={isEmpty()}>
        Pop
      </button>
      <button onClick={clear}>Clear</button>
      <div>Top of stack: {peek()}</div>
      <div>Stack size: {size}</div>
      <div>Full stack: {printStack()}</div>
    </div>
  )
}
```

</br>

### Parameters

1. `initialValue` (_any[]_): Initial array of items to populate the stack.

### Return value

An object containing:

1. `stack` (_any[]_): The current state of the stack.
2. `push` (_function_): Method to push an item onto the stack.
3. `pop` (_function_): Method to pop an item off the stack.
4. `clear` (_function_): Method to clear the stack.
5. `isEmpty` (_function_): Method to check if the stack is empty.
6. `peek` (_function_): Method to peek at the top item of the stack without removing it.
7. `printStack` (_function_): Method to return a string representation of the stack.
8. `size` (_number_): The current size of the stack.

</br>

### Notes

- `useStack` utilizes the custom `Stack` class from the provided 'lib/stack' to manage stack operations. This class should implement standard stack methods (`push`, `pop`, `peek`, `isEmpty`, `clear`) and maintain its own internal items array.
- The hook uses React's `useState` and `useEffect` to manage and re-render the stack state within your component.
- It's optimized to prevent unnecessary re-renders and only updates the component when stack operations are performed.

## 🔗 useList

Custom hook to implement and interact with a linked list data structure in your React components. It provides functionalities to insert, remove, find, and traverse the list.

### Usage

```jsx
import { useKeyPress, useList } from 'use-termite'
import { useEffect, useRef } from 'react'

const App = () => {
  const { append, list, size, pop, clear, insertAfter, deleteItem, shift, prepend } = useList()

  const inpRef = useRef(null)

  useKeyPress('Enter', () => {
    if (inpRef && inpRef.current && inpRef.current.value) {
      append(inpRef.current.value)
    }
  })

  useKeyPress('Escape', () => {
    if (inpRef && inpRef.current && inpRef.current.value) {
      pop()
    }
  })

  useEffect(() => {
    console.log(list)
  }, [list])

  return (
    <div>
      <input ref={inpRef} type='text' />
      <h1>My list ({size}):</h1>
      <button onClick={() => insertAfter(list[1], inpRef.current.value)}>inserAfter</button>
      <button onClick={() => deleteItem(inpRef.current.value)}>deleteItem</button>
      <button onClick={shift}>shift</button>
      <button onClick={clear}>clear</button>
      <button onClick={() => prepend(inpRef.current.value)}>prepend</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

In this example, `useList` is used to create and manipulate a linked list. You can insert items at the end, remove items from the end, find an item by value, and view all items in the list.

### Parameters

None.

### Return value

`{ append, list, size, pop, clear, insertAfter, deleteItem, shift, prepend }`

1. `append` (_function_): Function to insert an item at the end of the list.
2. `pop` (_function_): Function to remove and return the last item from the list.
3. `list` (_array_): Function to return all items in the list as an array.
4. `size` (_number_): The current number of items in the list.
5. `clear` (_function_): Function to clear the list.
6. `insertAfter` (_function_): Function to insert new value after a target value.
7. `deleteItem` (_function_): Function to delete a specific value from
8. `shift` (_function_): Function to remove the first element.
9. `prepend` (_function_): Function to add new Element to front of the list.

</br>

## 🗂 useQueue

Custom hook that provides a convenient way to interact with a queue data structure within your React components. It leverages a `Queue` class to manage the queue operations and integrates with React's state management to ensure the component re-renders when the queue changes.

### Usage

```jsx
import React from 'react'
import { useQueue } from 'use-termite'

const QueueComponent = () => {
  const { queue, enqueue, dequeue, size } = useQueue(['first', 'second'])

  const handleEnqueue = () => {
    enqueue('New Item')
  }

  const handleDequeue = () => {
    dequeue()
  }

  return (
    <div>
      <button onClick={handleEnqueue}>Enqueue</button>
      <button onClick={handleDequeue} disabled={size === 0}>
        Dequeue
      </button>
      <div>Queue size: {size}</div>
      <ul>
        {queue.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
```

In this example, `useQueue` is used to manage a queue of values. The hook initializes the queue with initial values if provided. It offers functions to `enqueue` (add an item to the end of the queue) and `dequeue` (remove an item from the front of the queue).

### Parameters

1. `initialValue` (_any[]_): Initial array of items to populate the queue.

### Return value

An object containing:

1. `queue` (_any[]_): The current state of the queue as an array.
2. `enqueue` (_function_): Method to add an item to the end of the queue.
3. `dequeue` (_function_): Method to remove an item from the front of the queue.
4. `size` (_number_): The current size of the queue.

### Notes

</br>

## ⏳ useCountDown

Custom hook to implement a countdown timer in your React components. It accepts a duration in milliseconds and provides the time left, along with booleans indicating the state of the countdown: whether it's started, ended, or actively counting down.

### Usage

```jsx
import React from 'react'
import { useCountDown } from 'use-termite'

const CountDownComponent = ({ initialTime }) => {
  const { leftTime, started, ended, isCounting, start, reset } = useCountDown(initialTime)

  return (
    <div>
      <p>Time left: {leftTime}ms</p>
      <p>{started ? (ended ? 'Countdown ended' : 'Countdown started') : 'Not started yet'}</p>
      <p>{isCounting ? 'Counting down...' : 'Paused'}</p>
      <button onClick={start} disabled={started}>
        Start Countdown
      </button>
      <button onClick={reset}>Reset Countdown</button>
    </div>
  )
}
```

In this example, `useCountDown` is used to create a countdown timer. You can start the countdown, check the time left, and reset the countdown.

### Parameters

1. `initialTime` (_number_): The initial time in milliseconds for the countdown.

### Return value

`{ leftTime, started, ended, isCounting, start, reset }`

1. `leftTime` (_number_): The time left in milliseconds.
2. `started` (_boolean_): Boolean indicating whether the countdown has been started.
3. `ended` (_boolean_): Boolean indicating whether the countdown has ended.
4. `isCounting` (_boolean_): Boolean indicating whether the countdown is actively counting down.
5. `start` (_function_): Function to start the countdown.
6. `reset` (_function_): Function to reset the countdown to the initial time.

</br>

## 🔊 useEventListener

Custom hook to easily add and remove event listeners to a DOM element. It accepts a ref to the element, the name of the event to listen for, and a callback function to execute when the event is triggered.

### Usage

```jsx
import React, { useRef } from 'react'
import { useEventListener } from 'use-termite'

const EventListenerComponent = () => {
  const buttonRef = useRef(null)

  const handleClick = () => {
    console.log('Button was clicked!')
  }

  // Using the useEventListener hook
  useEventListener(buttonRef, 'click', handleClick)

  return (
    <div>
      <button ref={buttonRef}>Click me!</button>
    </div>
  )
}
```

In this example, `useEventListener` is used to add a click event listener to a button. When the button is clicked, the `handleClick` function is executed, logging a message to the console.

### Parameters

1. `ref` (_React.RefObject_): A ref object pointing to the DOM element to which the event listener will be attached.
2. `event` (_String_): The name of the event to listen for (e.g., 'click', 'mouseover').
3. `callback` (_function_): The function to execute when the event is triggered.

### Return value

None. The hook directly sets up the event listener on the specified element.

</br>
