import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SwitchToggle from "./Switch";
import { FiSettings } from "react-icons/fi";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PopoverOptions({ switches, forces }: any) {
  console.log(forces);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="text-xl rounded-full  bg-cyan-500 hover:bg-none hover:bg-transparent hover:border-0"
        >
          <FiSettings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-2">
        <div className="flex flex-col justify-start bg-background backdrop-blur-xl items-start gap-3">
          {switches.map((switchItem: any, index: any) => (
            <SwitchToggle
              key={index}
              state={switchItem.state}
              setState={switchItem.setState}
              text={switchItem.text}
            />
          ))}
        </div>
        <div className="">
          <p className="text-lg font-bold self-center text-center py-2">
            Center Force
          </p>
          <RadioGroup
            defaultValue={forces.state.toString()}
            className="justify-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="-2500"
                id="option-one"
                onClick={() => forces.setState(-2500)}
              />
              <Label htmlFor="option-one">Weak</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="-750"
                id="option-two"
                onClick={() => forces.setState(-750)}
              />
              <Label htmlFor="option-two">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="-100"
                id="option-three"
                onClick={() => forces.setState(-100)}
              />
              <Label htmlFor="option-three">Strong</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
