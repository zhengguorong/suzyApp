/**
 * redux配置中心
 */

import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Provider } from 'react-redux'
import App from './containers/App.js'
import createStore from './createStore'

const store = createStore()

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Main
