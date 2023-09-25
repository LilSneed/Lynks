import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchToggle({ state, setState, text }: any) {
  return (
    <div className="flex items-center space-x-2 px-10">
      <Switch
        id="data-switch"
        checked={state} // Set the initial state as needed
        onCheckedChange={() => setState(!state)}
      />
      <Label htmlFor="data-switch" className="font-[600]">
        {text}
      </Label>
    </div>
  );
}
