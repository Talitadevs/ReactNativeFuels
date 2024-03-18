import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  Appbar,
} from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import { insertGasto, updateGasto, deleteGasto } from '../services/GastosServicesDB';

//Hook para navegar entre as páginas, pilha
import { useNavigation } from '@react-navigation/native';

const Abastecimento = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [tipo, setTipo] = useState('gas');
  const [preco, setPreco] = useState('');
  const [valor, setValor] = useState('');
  const [odometro, setOdometro] = useState('');
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));

  //traz os dados vindos de outra tela, ao clicar,verifica o tipo e traz preenchido. É o hook para fazer efeitos colaterais no sistema, trabalha com os estados. Assim que carregar a tela, ele vai retornar o resultado do ternário
  useEffect(() => {
    if (item) {
      setTipo(item.tipo == 0 ? 'gas' : 'eta');
      setData(item.data);
      setPreco(item.preco.toFixed(2));
      setValor(item.valor.toFixed(2));
      setOdometro(item.odometro.toFixed(0));
    }
  }, [item]);

  //pegar o que foi digitado pelo usuário e insere no banco de dados
  const handleSalvar = () => {
    if (item){

        updateGasto(
        {
          tipo: tipo == 'gas' ? 0 : 1,
          data: data,
          preco: preco,
          valor: valor,
          odometro: odometro,
          id: item.id
        }
      ).then();

    }else{
        insertGasto(
        {
          tipo: tipo == 'gas' ? 0 : 1,
          data: data,
          preco: preco,
          valor: valor,
          odometro: odometro,
        }
      ).then();

    }
    navigation.goBack();
  };

  const handleExcluir = () => {
      deleteGasto(item.id).then();
      navigation.goBack();
   };

  return (
    <Container>
      <Header title={'Abastecimento'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>

      <Body>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipo === 'gas' ? 'checked' : 'unchecked'}
              color={'red'}
              onPress={() => setTipo('gas')}
            />
            <Text>Gasolina</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipo === 'eta' ? 'checked' : 'unchecked'}
              color={'green'}
              onPress={() => setTipo('eta')}
            />
            <Text>Etanol</Text>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setData(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}

        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data"
            value={data}
            onChangeText={(text) => setData(text)}
            left={<TextInput.Icon icon="calendar" />}
            editable={false}
          />
        </TouchableOpacity>

        <Input
          label="Preço"
          value={preco}
          onChangeText={(text) => setPreco(text)}
          left={<TextInput.Icon icon="currency-brl" />}
        />

        <Input
          label="Valor"
          value={valor}
          onChangeText={(text) => setValor(text)}
          left={<TextInput.Icon icon="currency-brl" />}
        />

        <Input
          label="Odometro"
          value={odometro}
          onChangeText={(text) => setOdometro(text)}
          left={<TextInput.Icon icon="camera-timer" />}
        />

        <Button mode="contained" style={styles.button} onPress={handleSalvar}>
          Salvar
        </Button>

        {item && (
          <Button
            mode="contained"
            color={'red'}
            style={styles.button}
            onPress={handleExcluir}>
            Excluir
          </Button>
        )}
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerRadio: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    marginBottom: 8,
  },
});

export default Abastecimento;
