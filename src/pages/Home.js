import  React, { useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';


import Calculadora from './Calculadora';
import Gastos from './Gastos';

const Home = () => {
  //index determina qual pag será mostrada
  const [index, setIndex] = useState(0);
  //routes configura a rota entre as paginas
  const [routes] = useState([
    { key: 'gastos', title: 'Gastos', icon: 'gas-station'},
    { key: 'calculadora', title: 'Calculadora', icon: 'calculator'},
  ]);

  //renderiza para a tela calculadora
  const renderScene = BottomNavigation.SceneMap({
    gastos: Gastos,
    calculadora: Calculadora,
  });

  //retorna esse componente
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;