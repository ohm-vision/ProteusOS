import * as Yup from "yup";

export type Entity<T = any> = { yupSchema(): Yup.MixedSchema<T> }

export function validateModel<T extends object = {}>(config: Partial<Record<keyof T, Yup.AnySchema>>) {
    return Yup.mixed<T>().when({
        is: v => !!v,
        then: () => Yup.object(config)
    }).nullable();
}

export function validateRef<T extends Entity = Entity>(dep: { yupSchema(): Yup.MixedSchema<T>, new(): T }) {
    return Yup.mixed<Partial<T>>().when({
        is: v => !!v && Object.keys(v).length > (("_id" in v ? 1 : 0) + ("version" in v ? 1 : 0)),
        then: () => dep.yupSchema(),
    });
}

export function validateEnum<T = any>(values: Array<T> | ReadonlyArray<T>) {
    return Yup.mixed<T>().when({
        is: v => !!v,
        then: () => Yup.mixed<T>().oneOf(values)
    })
}

export const yup = {
    ...Yup,
    string: () => Yup.string().nullable(),
    number: () => Yup.number().nullable(),
    date: () => Yup.date().nullable(),
    phone: () => Yup.string().nullable().matches(/\d{10}/),
    model: validateModel,
    link: validateRef,
    enum: validateEnum,
}

