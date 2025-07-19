import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class Order extends Model {
    public id!: number;
    public userId!: number;
    public status!: 'paid' | 'active' | 'cancel' | 'completed';
    public start_date!: Date;
    public end_date!: Date;
    public total_day!: number;
    public total_price!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

 Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('paid', 'active', 'cancel', 'completed'),
      allowNull: false,
      defaultValue: 'paid',
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    schema: 'kanggo',
    timestamps: true,
});

export default Order;