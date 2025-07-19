import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Worker extends Model {
    public id!: number;
    public worker_name!: string;
    public price!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Worker.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    worker_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Worker',
    tableName: 'Workers',
    timestamps: true,
  });

  return Worker;
};