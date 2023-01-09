
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './App.css';
import { rootSaga, todoReducer } from './reducers/todo-reducer';
import TodoPageSaga from './components/todo-page-sagas';
import createSagaMiddleware from 'redux-saga';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import TodoPageQuery from './components/todo-page-query';

//const todoStore = createStore(todoReducer, applyMiddleware(thunk));

const sagaMiddleware = createSagaMiddleware();
const todoStore = createStore(todoReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const queryClient = new QueryClient();

function App() {
  return <>
  {/* <Provider store={todoStore}>
    <TodoPageSaga/>
  </Provider> */}

  <QueryClientProvider client={queryClient}>
    <TodoPageQuery/>
  </QueryClientProvider>

  </>
}

export default App;
