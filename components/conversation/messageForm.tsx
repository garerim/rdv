"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useGlobale } from '@/components/provider/globale-provider';

const formSchema = z.object({
    content: z.string().min(1),
});

export default function MessageForm() {

    const params = useParams();
    const router = useRouter();
    const {user} = useGlobale();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        },
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("http://localhost:3000/api/socket/messages", {
                ...values,
                conversationId: params?.conversationId,
                userProfileId: user.id
            });

            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative pb-6 w-full p-3 flex items-center gap-2'>
                                    <Input
                                        disabled={isLoading}
                                        className=''
                                        placeholder={`Message...`}
                                        {...field} />
                                    <Button type='submit'>
                                        <Send />
                                    </Button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
