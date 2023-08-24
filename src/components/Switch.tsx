import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo({ onCheckedChange }: any) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="data-switch"
        checked={false} // Set the initial state as needed
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="data-switch">Toggle Data</Label>
    </div>
  );
}
