"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React  from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type InputProps = {
  url: string;
  name: string;
  token?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<InputProps>();
  const refetch = useRefetch()

  const createProject = api.project.createProject.useMutation();

  const onSubmit = (item: InputProps) => {
    // console.log(JSON.stringify(item, null, 2));
    createProject.mutate(
      {
        name: item.name,
        url: item.url,
        token: item.token,
      },
      {
        onSuccess: () => {
          toast("Project Created Successfully");
          void refetch()
          reset();
        },
        onError: () => {
          toast("Something went wrong! try again!");
        },
      },
    );

    return true;
  };
  return (
    <div className="flex w-4/5 flex-col items-center justify-center px-4 py-3">
      <div className="flex flex-col mt-16 lg:mt-1 lg:flex-row items-center justify-center lg:justify-evenly">
        <Image
          src="/create.svg"
          alt="image"
          width={400}
          height={400}
          className="mx-6"
        />
        <div className="w-full px-6 py-4">
          <h1 className="text-3xl font-semibold">
            Link your github repository
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter the URL of the Github respository to link it with OUTBREAK
          </p>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input
                {...register("name", { required: true })}
                placeholder="Enter the name of Project"
                required
              />
              <Input
                {...register("url", { required: true })}
                type="url"
                placeholder="Enter the Github URL"
                required
              />
              <Input
                {...register("token")}
                placeholder="Enter the Github Tokens (optional)"
              />

              <Button
                disabled={createProject.isPending}
                variant={"default"}
                className="w-auto"
                type="submit"
              >
                {createProject.isPending && (
                  <Loader2Icon className="mr-1 size-5 animate-spin" />
                )}
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
