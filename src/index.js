import React from 'react'
import ReactDOM from 'react-dom/client'
import firebaseConfig from './firebase.config'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={'loading'} persistor={persistor}>
        {' '}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
reportWebVitals()
