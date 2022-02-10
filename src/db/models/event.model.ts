import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../connection';

interface EventAttributes {
  id: number;
  eventType: string;
  user: number;
  date: Date;
}

export type EventInput = Optional<EventAttributes, 'id' | 'date'>;
export type EventDTO = Optional<EventAttributes, 'id'>;
export type EventOutput = Required<EventAttributes>;

export class Event
  extends Model<EventAttributes, EventInput>
  implements EventAttributes
{
  public id!: number;
  public eventType!: string;
  public user!: number;
  public date!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    date: {
      type: DataTypes.TIME,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    updatedAt: false,
    createdAt: false,
    timestamps: false
  }
);

