//1)SQlite: é api(biblioteca) que dá interface para fazer as operações crud dentro do sistema
//2)dbset: deve retornar uma interface para fazer manipulação no conjunto de dados (pode ser reutilizável)
//3)Promise: roda de forma assíncrona, esepra o db rodar para depois executar a operação
//4)transações, são as interfaces que temos para fazer operaçõe sql dentro do db
//5)const ExecuteQuery feita de forma genérica para ser reutilizável

//cria e configura o banco de dados
import * as SQLite from 'expo-sqlite';

export const Database = {
  //executa as operações
  getConnection: () => {
    //abre conexão com o banco de dados, cria o db no sqlite
    const db = SQLite.openDatabase('fuel_manager.db');


    //tx=instãncia;tx.executeSql - ações nos parametros
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists gastos (id integer primary key not null, tipo int not null, data text not null, preco real not null, valor real not null, odometro real not null);'
      );

    });
  

    const ExecuteQuery = (sql, params = []) =>
      new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(
            sql,
            params,
            (trans, results) => {
              resolve(results);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });

      return ExecuteQuery;      
  },
};

export default Database;
