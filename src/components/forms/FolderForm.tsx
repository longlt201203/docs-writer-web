import { createContext, useContext, type PropsWithChildren } from "react"
import { Form, useForm, type UseFormReturn } from "react-hook-form"

export interface FormFolderContextProps {
    form: UseFormReturn<any>;
}

export const FormFolderContext = createContext<FormFolderContextProps | null>(null);

export interface FolderFormProps extends PropsWithChildren {}


export default function FolderForm({ children }: FolderFormProps) {
    const form = useForm<any>()
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => {})}>
                <FormFolderContext.Provider value={{ form }}>
                    {children}
                </FormFolderContext.Provider>
            </form>
        </Form>
    )
}

export function FolderFormFields() {
    const ctx = useContext(FormFolderContext);
    if (!ctx) throw new Error("FolderFormFields must be used within a FolderForm");
    const { form } = ctx;
}