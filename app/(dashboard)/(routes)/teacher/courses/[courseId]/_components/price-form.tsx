"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";
interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number()
})

const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price : initialData?.price || undefined,
        },
    })

    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const { isSubmitting, isValid } = form.formState
    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
       try {
         await axios.patch(`/api/courses/${courseId}`, values)
         toast.success("Course Updated")
         toggleEdit()
         router.refresh()
       } catch (error) {
        toast.error("Someting went wrong")
       }
        
    }
    
    return ( 
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium  flex items-center justify-between">
            Course price
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (
                    <>cancel</>
                )}
                {!isEditing && (<Pencil className="h-4 w-4 mr-2">
                    Edit price
                </Pencil>)}
            </Button>
        </div>
        {!isEditing && (
        <p className={cn("text-sm mt-2",
        !initialData.price && "text-slate-500 italic")}>
            {initialData?.price ? formatPrice(initialData?.price ): "No price"}
        </p>
        )}
        {isEditing && (
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                        >
                            <FormField 
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                            type="number"
                                            step="0.01"
                                             disabled={isSubmitting}
                                             placeholder="Set a price for your course"
                                             {...field}
                                             />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                           
                            />
                            <div className="flex items-center gap-2">
                                <Button
                                 disabled={!isValid ||  isSubmitting}
                                 type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
    </div> );
}
 
export default PriceForm;