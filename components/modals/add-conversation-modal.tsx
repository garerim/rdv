"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { UserProfile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobale } from "../provider/globale-provider";

interface AddConversationModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required."
  }),
  userProfileId: z.string().min(1, {
    message: "User profile is required."
  }),
});

export const AddConversationModal = ({ isModalOpen, handleClose }: AddConversationModalProps) => {

  const router = useRouter();
  const {user} = useGlobale()

  const [users, setUsers] = useState<UserProfile[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      response.json().then((data) => setUsers(data));
    }

    getUsers();
  }, [])


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      userProfileId: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/conversations",
      });
      await axios.post(url, {
        ...values,
        membreCreateurId: user?.id
      });

      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add Conversation
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Conversation name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userProfileId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                        >
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(users).map((user) => (
                          <SelectItem
                            key={user.id}
                            value={user.id}
                            className="capitalize"
                          >
                            {user.firstName} {user.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}