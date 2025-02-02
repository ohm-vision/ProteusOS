export interface ProteusModule {
    "$schema"?: "http://localhost/v1/module.spec.json" | "../ProteusOS/web/public/v1/module.spec.json",

    make: (keyof Omit<ProteusModule, "$schema" | "make">)[];

    terraform?: boolean | Record<string, any>;
}