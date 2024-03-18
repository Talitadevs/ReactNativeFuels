import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Main from './src/navegations/Main';


const App = () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default App;
//para fazer navegação de telas/pilha, onde o último elemento inserido é o primeiro a ser inserido, é colocar uma tela sobre a outra