import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToggleFrameActiveStatus } from "@/hooks/api/useToggleFrameActiveStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {
  frameId: string;
  name: string;
  isActive: boolean;
};

export function FrameDetailHeader({ frameId, name, isActive }: Props) {
  const navigate = useNavigate();
  const { mutate: toggleFrameActiveStatus } = useToggleFrameActiveStatus();
  const queryClient = useQueryClient();

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-muted-foreground">Frame</div>
          <div className="truncate text-2xl font-semibold">{name} {!isActive && "(Inactive)"}</div>
          <div className="truncate text-sm text-muted-foreground">{frameId}</div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button
            variant={isActive ? "destructive" : "default"}
            className={isActive ? "bg-red-500 text-white hover:bg-red-500/90" : "bg-green-500 text-white hover:bg-green-500/90"}
            onClick={() => {
              toggleFrameActiveStatus(frameId, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["frame-detailed"] });
                  toast.success(isActive ? "Frame deactivated" : "Frame activated");
                  navigate("/");
                },
              });
            }}
          >
            {isActive ? "Delete" : "Activate"}
          </Button>
        </div>
      </div>

      <Separator />
    </>
  );
}


