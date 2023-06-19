import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { MainLayout } from './scr/MainLayout';
import { TodoState } from './scr/context/todo/TodoState';
import { ScreenState } from './scr/context/screen/ScreenState';

async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onError={console.warn}
        onFinish={() => setIsReady(true)}
     />
    )
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
