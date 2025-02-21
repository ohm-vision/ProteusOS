import { yup } from "src/common/utils/yup.util";

export class TerraformOptions {
    platform: "proteus";
    domain: string;

    static yupSchema() {
        return yup.model<TerraformOptions>({
            platform: yup.string().required().oneOf([ "proteus" ]).default("proteus"),
            domain: yup.string().required().default("proteus")
        })
    }
}