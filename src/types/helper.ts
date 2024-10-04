type NestedKeys<T> = T extends object ? {
    [K in keyof T]: T[K] extends object ? [K, ...NestedKeys<T[K]>] : [K];
}[keyof T] : never;

// Use for mapping between form and entity
export type BindingMapping<Entity, FormSchema> = Partial<{
    [K in keyof Entity]: {
        stateBinding?: (value: any) => void
        formBinding?: {
            formKey?: keyof FormSchema
        }
        objectKey?: NestedKeys<NonNullable<Entity[K]>>
    }
}>;
