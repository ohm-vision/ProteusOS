import { Global, Module } from '@nestjs/common';
import { ExecService } from './exec.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ExecService],
  exports: [ ExecService ]
})
export class ExecModule {}
