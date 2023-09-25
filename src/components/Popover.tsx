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

export function PopoverOptions({ switches }: any) {
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
      <PopoverContent className="w-80">
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
      </PopoverContent>
    </Popover>
  );
}
