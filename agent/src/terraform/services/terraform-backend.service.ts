import { Injectable } from "@nestjs/common";
import { TerraformService } from "./terraform.service";

@Injectable()
export class TerraformBackendService {
    constructor(
        private readonly terraform: TerraformService
    ) {}
}