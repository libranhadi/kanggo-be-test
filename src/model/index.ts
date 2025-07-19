import User from './User';
import Role from './Role';
import sequelize from '../config/database';

import Worker from './Worker';
import Order from './Order';
import OrderWorker from './OrderWorker';
require("dotenv").config()



const models = {
    User,
    Role,
    Order,
    Worker,
    OrderWorker
};


const setupAssociations = () => {
    User.belongsTo(Role, { foreignKey: 'role_id', as: 'roles' });
    Role.hasMany(User, { foreignKey: 'role_id' });
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User, { foreignKey: 'userId' });

    Order.belongsToMany(Worker, { through: OrderWorker, foreignKey: 'orderId' });
    Worker.belongsToMany(Order, { through: OrderWorker, foreignKey: 'workerId' });
};

setupAssociations();

sequelize.sync()
  .then(() => {
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

export default models;