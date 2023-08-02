import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function DescEdit() {
  return (
    <div className="grid w-full gap-2">
      <h4 className="text-center scroll-m-20 text-base font-semibold tracking-tight">
        Edit Cluster Description
      </h4>
      <Textarea placeholder="Max. 191 letters." />
      <Button>Update</Button>
    </div>
  );
}
