import { Sequelize } from 'sequelize';

const DB_URI = process.env.DB_URI
const sequelize = new Sequelize(String(DB_URI));

export default sequelize;