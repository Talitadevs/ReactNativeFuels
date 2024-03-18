import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title, goBack, children }) => {
   //sem goBack, a seta é mostrada em todas as telas, inserir apenas nos componentes que quero chamar
  return (
    <Appbar.Header>
      {
        goBack && 
        <Appbar.BackAction onPress={goBack} />
      }
      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  );
};

export default Header;
