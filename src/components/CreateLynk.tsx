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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateLynk() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Lynk to Cluster</CardTitle>
        <CardDescription>
          Deploy a new Lynk to your Cluster Page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your Lynk" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">URL</Label>
              <Input id="name" placeholder="ex: Twitter.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Image</Label>
              <Input id="name" placeholder="PLACEHOLDER" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Color</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem
                    value="next"
                    className="bg-secondary-foreground text-black"
                  >
                    Default
                  </SelectItem>
                  <SelectItem
                    value="sveltekit"
                    className="bg-[#ffa6c9] text-background"
                  >
                    Carnation Pink
                  </SelectItem>
                  <SelectItem value="Firebrick" className="bg-[#b22222]">
                    Firebrick
                  </SelectItem>
                  <SelectItem
                    value="nuxt"
                    className="bg-[#87cefa] text-background"
                  >
                    Light Sky Blue
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Add</Button>
      </CardFooter>
    </Card>
  );
}
