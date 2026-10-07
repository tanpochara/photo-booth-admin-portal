import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useDeleteFrame } from "@/hooks/api/useDeleteFrame";
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
  const { mutate: deleteFrame } = useDeleteFrame();
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
            {isActive ? "Disable" : "Activate"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete frame?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes this frame and its child frames,
                  including their payment history. Existing photo files are
                  retained.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteFrame(frameId, {
                      onError: (error) => {
                        const userMessage = (
                          error as { body?: { userMessage?: unknown } }
                        ).body?.userMessage;
                        toast.error(
                          typeof userMessage === "string"
                            ? userMessage
                            : "Failed to delete frame",
                        );
                      },
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["frame-detailed"],
                        });
                        toast.success("Frame deleted");
                        navigate("/");
                      },
                    });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />
    </>
  );
}
