import { Module } from '@nestjs/common';

import { ExecModule } from '../exec/exec.module';

import { NpmService } from './services/npm.service';
import { NpmController } from './controllers/npm.controller';
import { NpmModuleService } from './services/module.service';
import { NpmModuleController } from './controllers/module.controller';

@Module({
  imports: [
    ExecModule
  ],
  controllers: [NpmController, NpmModuleController],
  providers: [NpmService, NpmModuleService],
  exports: [ NpmService ]
})
export class NpmModule {}
