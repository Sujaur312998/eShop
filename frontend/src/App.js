import './App.css';
import Main from './component/main'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  window.store=store
  return (
    <div>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
