import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '../../domain/models/address.model';
import { AdressesController } from '../../application/controllers/adresses.controller';
import { AdressesService } from '../../domain/service/adresses.service';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { User } from '../../domain/models/user.model';
import { UsersController } from '../../application/controllers/users.controller';
import { UsersService } from '../../domain/service/users.service';
import { Store } from '../../domain/models/store.model';
import { StoresController } from '../../application/controllers/stores.controller';
import { StoresService } from '../../domain/service/stores.service';

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
