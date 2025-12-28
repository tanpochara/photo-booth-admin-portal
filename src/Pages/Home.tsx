import { FrameCard } from "@/components/FrameCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateFrame } from "@/hooks/api/useCreateFrame";
import { useGetFrameDetailed } from "@/hooks/api/useGetFrameDetailed";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const HomePage = () => {
  const { data, isLoading, error } = useGetFrameDetailed();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createFrame, isPending: isCreating } = useCreateFrame();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    layout: "",
    imagesCount: 4,
    replaceBackgroundPrompt: "",
  });

  const canSubmit = useMemo(() => {
    return (
      createForm.name.trim().length > 0 &&
      createForm.description.trim().length > 0 &&
      createForm.layout.trim().length > 0 &&
      Number.isFinite(createForm.imagesCount) &&
      createForm.imagesCount > 0 &&
      createForm.replaceBackgroundPrompt.trim().length > 0
    );
  }, [createForm]);

  async function onCreate() {
    try {
      await createFrame(
        {
          name: createForm.name.trim(),
          description: createForm.description.trim(),
          layout: createForm.layout.trim(),
          imagesCount: createForm.imagesCount,
          replaceBackgroundPrompt: createForm.replaceBackgroundPrompt.trim(),
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["frame-detailed"] });
          },
        }
      );
      toast.success("Frame created");
      setIsCreateOpen(false);
      setCreateForm({
        name: "",
        description: "",
        layout: "",
        imagesCount: 4,
        replaceBackgroundPrompt: "",
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to create frame";
      toast.error(message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-4 flex items-center justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create frame</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create frame</DialogTitle>
              <DialogDescription>Fill out the details, then click Create.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="create-name">Name</Label>
                <Input
                  id="create-name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                  disabled={isCreating}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="create-layout">Layout</Label>
                <Input
                  id="create-layout"
                  value={createForm.layout}
                  onChange={(e) => setCreateForm((p) => ({ ...p, layout: e.target.value }))}
                  disabled={isCreating}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="create-imagesCount">Images count</Label>
                <Input
                  id="create-imagesCount"
                  type="number"
                  value={createForm.imagesCount}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, imagesCount: Number(e.target.value) }))
                  }
                  disabled={isCreating}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="create-description">Description</Label>
                <textarea
                  id="create-description"
                  value={createForm.description}
                  onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                  disabled={isCreating}
                  className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="create-rbp">Replace background prompt</Label>
                <textarea
                  id="create-rbp"
                  value={createForm.replaceBackgroundPrompt}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, replaceBackgroundPrompt: e.target.value }))
                  }
                  disabled={isCreating}
                  className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button onClick={onCreate} disabled={!canSubmit || isCreating}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data && data?.map((frame) => (
          <FrameCard
            key={frame.id}
            frame={frame}
            onClick={() => navigate(`/frame/${frame.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
