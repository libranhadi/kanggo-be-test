import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public cellphone!: string;
  public role!: 'customer' | 'admin';
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async setPassword(password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'users',
    paranoid: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
    deletedAt: 'deleted_at',
    schema: 'kanggo'
  }
);

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      schema:'kanggo',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at', 
      updatedAt: 'updated_at', 
      deletedAt: 'deleted_at',
    }
  );
export default User;