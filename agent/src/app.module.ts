import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NpmModule } from './npm/npm.module';
import { ExecModule } from './exec/exec.module';
import { SshModule } from './ssh/ssh.module';
import { TerraformModule } from './terraform/terraform.module';
import { TokenModule } from './token/token.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ExecModule,
    NpmModule,
    TerraformModule,
    SshModule,

    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
