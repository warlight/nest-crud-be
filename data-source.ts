import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/config/data-source.options';

export default new DataSource(dataSourceOptions);
