import Database from './DbServices';

//está pegando o serviço de db para trabalhar sob esses dados
const DB_EXEC = Database.getConnection();

//recupera todo os dados que estão no db
export const getGastos = async () => {
  try {
    let results = await DB_EXEC(`select * from gastos`);
    // console.log('getGastos status:'+results);
    return results.rows._array; //forma de pegar os resultados, opções na doc
  } catch(error) {
    console.error('Erro ao recuperar gastos:', error);
    return [];
  }
};

//insere dados no db
export const insertGasto = async (param) => {
  try {
    let results = await DB_EXEC(`insert into gastos(tipo, data, preco, valor, odometro)
 values(?,?,?,?,?)`, [param.tipo,param.data,param.preco,param.valor,param.odometro]);
  //  console.log('insertGasto:'+results);
    return results.rowsAffected;
  } catch(error) {
    console.error('Erro ao inserir gasto:(', error);
    return [];
  }
};


//atualiza dados no db
export const updateGasto = async (param) => {
  try {
    let results = await DB_EXEC(`update gastos set tipo=?, data=?, preco=?, valor=?, odometro=?where id=?`, [param.tipo,param.data,param.preco,param.valor,param.odometro,param.id]);
  //  console.log('updateGasto:'+results);
    return results.rowsAffected;
  } catch(error) {
    console.error('Erro ao atualizar gasto:(', error);
    return [];
  }
};


//deleta dados no db
export const deleteGasto = async (id) => {
  try {
    let results = await DB_EXEC(`delete from gastos where id=?`, [id]);
  //  console.log('deleteGasto:'+results);
    return results.rowsAffected;
  } catch(error) {
    console.error('Erro ao deletar gasto:(', error);
    return [];
  }
};
