import { Injectable } from "@nestjs/common";
import { TerraformOptions } from "../models/terraform.options";

@Injectable()
export class TerraformOptionsService implements TerraformOptions {
    platform: "proteus" = "proteus";
    domain: string = this.platform;

    

}