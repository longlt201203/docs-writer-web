import { createContext, useContext, useEffect, type PropsWithChildren } from "react"
import { useForm, type UseFormReturn } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

export const folderSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Folder name is required"),
});

export type FolderFormValues = z.infer<typeof folderSchema>;

export interface FolderFormContextProps {
    form: UseFormReturn<FolderFormValues>;
}

export const FolderFormContext = createContext<FolderFormContextProps | null>(null);
export interface FolderFormProps extends PropsWithChildren {
    folder?: FolderFormValues;
    onSubmit?: (values: FolderFormValues) => void;
}

export default function FolderForm({ folder, children, onSubmit }: FolderFormProps) {
    const form = useForm<FolderFormValues>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(folderSchema),
    });

    useEffect(() => {
        if (folder) {
            form.reset(folder);
        }
    }, [folder, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => {
                if (onSubmit) {
                    onSubmit(values);
                }
            })}>
                <FolderFormContext.Provider value={{ form }}>
                    {children}
                </FolderFormContext.Provider>
            </form>
        </Form>
    )
}

export function FolderFormFields() {
    const ctx = useContext(FolderFormContext);
    if (!ctx) throw new Error("FolderFormFields must be used within a FolderForm");
    const { form } = ctx;

    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Folder Name</FormLabel>
                        <Input
                            placeholder="New Folder"
                            {...field}
                        />
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
        </>
    )
}