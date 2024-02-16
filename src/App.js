import { BrowserRouter } from 'react-router-dom'
import RouterView from './routes/RouterView';
import { KeepAliveProvider } from 'keepalive-react-component'

function App() {
  return (
    <BrowserRouter>
      <KeepAliveProvider>
        <RouterView />
      </KeepAliveProvider>
    </BrowserRouter>
  );
}

export default App;
