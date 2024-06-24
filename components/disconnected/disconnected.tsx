import { CircleX } from "lucide-react";

export const Disconnected = () => {
  return (
    <div className="absolute z-50 w-full h-full flex flex-col items-center justify-center gap-10 bg-background">
      <CircleX />
      <h1 className="relative text-text text-xl text-foreground">
        {"Vous n'êtes pas connecté"}
      </h1>
    </div>
  );
};
