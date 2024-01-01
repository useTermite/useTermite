# Documentation

## Table of Contents

1. [useNetworkState](#-usenetworkstate)
2. [useCopyPaste](#-usecopypaste)
3. [useDarkMode](#-usedarkmode)
4. [useLocalStorage](#-uselocalstorage)
5. [useFetch](#-usefetch)
6. [useClickOutside](#-useclickoutside)
7. [useCounter](#-usecounter)
8. [useIsFetching](#-useisfetching)
9. [useCookies](#-usecookies)
10. [useHover](#-usehover)
11. [useMediaQuery](#-usemediaquery)
12. [useIsClient](#-useisclient)
13. [useTitle](#-usetitle)
14. [useDebounce](#-usedebounce)
15. [useKeyPress](#-usekeypress)
16. [useRenderCount](#-userendercount)
17. [useIsFirstRender](#-useisfirstrender)
18. [useOrientation](#-useorientation)
19. [useDevice](#-usedevice)
20. [useLocation](#-uselocation)
21. [useStack](#-usestack)
22. [useList](#-uselist)
23. [useQueue](#-usequeue)
24. [useCountDown](#-usecountdown)
25. a little bit of creativity [useEventListener](#-useeventlistener)

</br>

## 🌐 useNetworkState

Custom hook to track the network state of the user's device, providing information on whether the device is online or offline.

### Usage

```jsx
import React from "react";
import { useNetworkState } from "use-custom-hooks";

const NetworkStatus = () => {
  const { isOnline, state } = useNetworkState();
  /*
    If the user is connected to the internet, isOnline will be true and state will be 'online'.
    Otherwise, isOnline will be false and state will be 'offline'.
  */

  return (
    <div>
      <p>Network status: {state}</p>
      <p>{isOnline ? "You are Online" : "You are Offline"}</p>
    </div>
  );
};
```

### Parameters

None.

### Return value

`{isOnline, state}`

1. `isOnline` (_boolean_) : A boolean value indicating whether the user is online or not.
2. `state` (_String_) : A string representing the current network state, either 'online' or 'offline'.

</br>
