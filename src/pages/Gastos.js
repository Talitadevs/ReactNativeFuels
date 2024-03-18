import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import {getGastos} from '../services/GastosServicesDB';

//useNavegation é o hook da biblioteca que var dar uma função
import {useNavigation} from '@react-navigation/native';
//dá refresh na tela que está em foco
import {useIsFocused} from '@react-navigation/native';

const Gastos = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //vetor de dados
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    getGastos().then((dados) => {
      setGastos(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={
        'R$' + item.valor.toFixed(2) + ' (R$' + item.preco.toFixed(2) + ')'
      }
      description={item.odometro + ' Km'}
      left={(props) => (
        <List.Icon
          {...props}
          color={item.tipo === 0 ? 'red' : 'green'}
          icon="gas-station"
        />
      )}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {item.data}{' '}
        </Text>
      )}
      //ao clicar no item de gasto da home, vai abrir abastecimento/item passa parametro para a próxima tela/route recebe o valor enviado
      onPress={() => navigation.navigate('Abastecimento', { item })}
    />
  );

  return (
    <Container>
      <Header title={'Fuel Manager'} />
      <Body>
        <FlatList
          data={gastos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('Abastecimento')}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Gastos;
