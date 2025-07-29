import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dataSourceOptions} from './config/data-source.options';

@Module({
    imports: [UsersModule, TypeOrmModule.forRoot(dataSourceOptions)],
    controllers: [AppController],
})
export class AppModule {
}
