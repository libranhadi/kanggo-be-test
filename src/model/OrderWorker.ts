import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Order from './Order';

class OrderWorker extends Model {
    public orderId!: number;
    public workerId!: number;
}


OrderWorker.init({
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  workerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'OrderWorker',
  tableName: 'OrderWorkers',
  timestamps: false,
  schema: 'kanggo'
});

export default OrderWorker;