import { sequelize, Sequelize } from '../src/app/models';

class TestDB {
  /**
   * To check if the database has a particular row in a table
   * @param {*} tableName
   * @param {*} data
   */
  static async has(tableName, data) {
    let whereConditions = '';

    const columnNames = Object.keys(data);
    columnNames.forEach((column, index) => {
      const condition = `${column}='${data[column]}'`;
      if (index === columnNames.length - 1) {
        whereConditions += condition;
      } else {
        whereConditions += `${condition} AND `;
      }
    });

    try {
      const result = await sequelize.query(`SELECT * FROM ${tableName} WHERE ${whereConditions}`, {
        type: Sequelize.QueryTypes.SELECT
      });
      return result.length > 0;
    } catch (error) {
      return false;
    }
  }
}

export default {
  TestDB
};
