import { Sequelize } from 'sequelize';
import UserModel from './User';
import WorkerModel from './Worker';
import OrderModel from './Order';
import OrderWorkerModel from './OrderWorker';
require("dotenv").config()


const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
});

const User = UserModel(sequelize);
const Worker = WorkerModel(sequelize);
const Order = OrderModel(sequelize);
const OrderWorker = OrderWorkerModel(sequelize);

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Worker, { through: OrderWorker, foreignKey: 'orderId' });
Worker.belongsToMany(Order, { through: OrderWorker, foreignKey: 'workerId' });

export { sequelize, User, Worker, Order, OrderWorker };