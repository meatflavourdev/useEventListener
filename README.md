# React Mouse Position Tracker

This example project showcases a custom hook `useEventListener` and its usage in tracking the mouse cursor position. It's not meant to be used as a standalone package, but rather as a learning resource for understanding the concept of custom hooks, event listeners, and state management in React.



## How to Use This Project

You can use this project as a starting point for building a mouse position tracker with React. Here are the steps to get started:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install the dependencies using `npm install` or `yarn install`.
3. Start the development server using `npm start` or `yarn start`.
4. 

## Learning Outcomes

By working with this project, you can learn:

- How to use React hooks to track the mouse cursor position.
- How to use the `useState` and `useCallback` hooks.
- How to create a custom hook for adding event listeners in React components.

You can also use this project as a starting point for building more complex mouse-tracking applications, such as collaborative cursor-sharing tools.

License
This project is licensed under the MIT License. See the LICENSE.md file for more details.



## Understanding the Code

This project provides a custom hook `useEventListener` that makes it easy to add event listeners in React. The hook is defined in `use-event-listener.js` and can be imported and used in any React component.

The hook takes in three arguments:

- `eventName`: The name of the event to listen for (e.g. 'click', 'mousemove', etc.)
- `handler`: The function that will be called when the event is triggered
- `element`: The element that the event listener should be added to (defaults to `window`)

The hook uses two React `useEffect` hooks to manage the event listener. The first `useEffect` updates a `savedHandler` ref with the latest `handler` function every time `handler` changes. This ensures that the most up-to-date `handler` function is used in the event listener.

The second `useEffect` sets up the event listener. It first checks if the `element` supports `addEventListener`, and if not, the hook does nothing. If the `element` does support `addEventListener`, the hook creates an event listener that calls the `handler` function stored in the `savedHandler` ref, and then adds the event listener to the `element`. When the component using the hook is unmounted, the hook removes the event listener.



## The useEventListener hook

The `useEventListener` hook is a simple hook that adds an event listener to an element and removes it when the component that uses it unmounts. The hook utilizes React's `useEffect` and `useRef` hooks to achieve this.

Here's the code for `useEventListener`:

```javascript
import { useEffect, useRef } from "react";

export default function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
```

The `useEventListener` hook is a flexible and reusable way to handle adding and removing event listeners in your React components.



## Mouse Cursor Position State Tracking

The `App` component is a simple React component that tracks the mouse cursor position using the `useEventListener` hook and updates the state with the latest coordinates using the `useState` hook.

```javascript
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import useEventListener from "./use-event-listener";
import "./styles.scss";

function App() {
  // State for storing mouse coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // Update coordinates
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  // Add event listener using our hook
  useEventListener("mousemove", handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

And that's it! You now have a complete example of using the `useEventListener` custom hook to track the mouse position in a React application. This hook allows you to easily add and remove event listeners in your component, without having to worry about cleaning up the event listeners when the component is unmounted. Additionally, by using the `useCallback` hook, the handler function passed to `useEventListener` will only be recreated if `setCoords` changes. This is important because recreating the handler on every render would cause the event listener to be added and removed multiple times, leading to unexpected behavior.



## License

This project is licensed under the MIT License. See the [LICENSE](https://chat.openai.com/LICENSE) file for more details.
