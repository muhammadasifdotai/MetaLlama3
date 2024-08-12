import { Provider } from 'react-redux';
import MetaAI from './src/MetaAI';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//persistGate: jo data locally avaible hoga us ko ya very quickly us ko refresh kr da ga very quickly.

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <MetaAI/>
      </PersistGate>
    </Provider>
  )
}

