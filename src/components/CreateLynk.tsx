"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { url } from "inspector";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRouter } from "next/navigation";

export default function CreateLynk({
  clusterId,
  authId,
}: {
  clusterId: number;
  authId: string;
}) {
  const [colorValue, setColorValue] = React.useState("#fef2f2");
  const [titleValue, setTitleValue] = React.useState("");
  const [urlValue, setUrlValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [imageValue, setImageValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const handleCLick = () => {
    setOpen(true);
  };

  const lynkData = {
    title: titleValue,
    url: urlValue,
    image: imageValue,
    clusterId: clusterId,
    color: colorValue,
    authId: authId,
  };

  const handleSubmit = async () => {
    if (!lynkData.title || !lynkData.url || !lynkData.image) {
      setError("One or more Values are Empty!");
    } else {
      await fetch("http://localhost:3000/api/createLynk", {
        method: "POST",
        body: JSON.stringify(lynkData),
      });
      setOpen(false);
      setSuccess(true);
      router.refresh();
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Lynk to Cluster</CardTitle>
        <CardDescription>Deploy a new Lynk to your Cluster.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your Lynk"
              onChange={(event) => setTitleValue(event.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">URL</Label>
            <Input
              id="name"
              placeholder="ex: Twitter.com"
              onChange={(event) => setUrlValue(event.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>{`Image (Emojis only)`}</Label>
            <Button onClick={handleCLick} variant={"default"}>
              <p>Emojis</p>
              {open && (
                <div className="fixed">
                  <Picker
                    data={data}
                    onEmojiSelect={(e: any) => {
                      setImageValue(e.native);
                      setOpen(false);
                    }}
                    theme="dark"
                    onClickOutside={() => setOpen(false)}
                  />
                </div>
              )}
            </Button>
            <Label>{`Currently Selected > ${imageValue}`}</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <RadioGroup
              defaultValue="#fef2f2"
              onValueChange={(value) => setColorValue(value)}
            >
              <p>Lynk Color</p>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="#fef2f2" id="r1" />
                <Label htmlFor="r1" className="text-[#fef2f2]">
                  Default Color
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="#318ce7" id="r2" />
                <Label htmlFor="r2" className="text-[#318ce7]">
                  Bleu de France
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="#a8e4a0" id="r3" />
                <Label htmlFor="r3" className="text-[#a8e4a0]">
                  Apple
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="#ff9933" id="r3" />
                <Label htmlFor="r3" className="text-[#ff9933]">
                  Deep Saffron
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Label className="mx-5 text-red-600">
          {error}
          {success && (
            <Label className="text-green-500 mx-5">
              {" "}
              Lynk Added Successfully{" "}
            </Label>
          )}
        </Label>
        <Button onClick={handleSubmit}>Add</Button>
      </CardFooter>
    </Card>
  );
}
function userRouter() {
  throw new Error("Function not implemented.");
}
