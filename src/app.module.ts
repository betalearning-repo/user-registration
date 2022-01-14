import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './address.model';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Store } from './store.model';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USUARIO_BANCO_DADOS,
      password: process.env.SENHA_BANCO_DADOS,
      database: 'userregistration',
      autoLoadModels: true,
      synchronize: true,
      logQueryParameters: true,
      pool: {
        min: 2
      }
    }),
    SequelizeModule.forFeature([Address, User, Store])
  ],
  controllers: [AppController, AdressesController, UsersController, StoresController],
  providers: [AppService, AdressesService, UsersService, StoresService],
})
export class AppModule { }
