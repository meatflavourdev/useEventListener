import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import useEventListener from './use-event-listener';
import './styles.scss';

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
  useEventListener('mousemove', handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
