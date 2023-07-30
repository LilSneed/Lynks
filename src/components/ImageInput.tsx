import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ImageInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
      <Label htmlFor="picture" className="text-center">
        Cluster Picture
      </Label>
      <Input type="file" />
    </div>
  );
}
