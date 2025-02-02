import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NpmModule } from './npm/npm.module';
import { ExecModule } from './exec/exec.module';
import { SshModule } from './ssh/ssh.module';
import { TerraformModule } from './terraform/terraform.module';

@Module({
  imports: [
    ExecModule,
    NpmModule,
    TerraformModule,
    SshModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
