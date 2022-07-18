import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ipfsController } from './ipfs.controller';
import { mintController } from './mint.controller';
import { SharedModule } from './shared/shared.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    MulterModule.register({
      dest: '../upload',
    }),
  ],
  controllers: [AppController, ipfsController, mintController],
  providers: [AppService],
})
export class AppModule {}
