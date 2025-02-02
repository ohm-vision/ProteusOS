import { Module } from "@nestjs/common";
import { TerraformService } from "./services/terraform.service";
import { ExecModule } from "src/exec/exec.module";
import { TerraformBackendService } from "./services/terraform-backend.service";

@Module({
    imports: [ ExecModule ],
    providers: [ TerraformService, TerraformBackendService ],
    controllers: [],
    exports: [],
})
export class TerraformModule {}