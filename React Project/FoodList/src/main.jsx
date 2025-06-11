import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux';
import store from './Store/store.js';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
    </Provider>
)
