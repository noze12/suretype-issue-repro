import { useEffect } from 'react'
import './App.scss'
import { ipcRenderer } from "electron";
import { useSnapshot } from 'valtio'
import { state } from './state';

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const snapshot = useSnapshot(state)

  useEffect(() => {
    const listener = () => {
      if (!state.confirm || window.confirm('close ?')) {
        ipcRenderer.invoke("close-window-allowed");
      }
    }
    ipcRenderer.on("close-window", listener);
    return () => {
      ipcRenderer.removeListener("close-window", listener);
    }
  }, []);

  return (
    <div className='App'>
      <h1>Electron + Vite + React</h1>
      <div className='card'>
        <p>state.confirm : {snapshot.confirm ? 'true' : 'false' }</p>
        <button onClick={() => state.confirm = !snapshot.confirm }>
          toggle close confirm
        </button>
      </div>
    </div>
  )
}

export default App
