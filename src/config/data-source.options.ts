import { DataSourceOptions, DefaultNamingStrategy } from 'typeorm';
import * as dotenv from 'dotenv';
import { snakeCase } from "typeorm/util/StringUtils";

dotenv.config();

class CustomNamingStrategy extends DefaultNamingStrategy {
    columnName(
        propertyName: string,
        customName: string | undefined,
        embeddedPrefixes: string[]
    ): string {
        return snakeCase(
            embeddedPrefixes.concat(customName ? customName : propertyName).join("_")
        );
    }
}

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    synchronize: false,
    namingStrategy: new CustomNamingStrategy()
};
