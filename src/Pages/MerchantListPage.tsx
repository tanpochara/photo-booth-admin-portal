import { MerchantCard } from "@/components/MerchantCard";
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
import { useCreateMerchant } from "@/hooks/api/useCreateMerchant";
import { useGetMerchantsDetailed } from "@/hooks/api/useGetMerchantsDetailed";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const MerchantListPage = () => {
  const { data, isLoading, error } = useGetMerchantsDetailed();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createMerchant, isPending: isCreating } = useCreateMerchant();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    slug: "",
    lat: 0,
    long: 0,
    allowedRadiusMeter: 500,
  });

  const canSubmit = useMemo(() => {
    return (
      createForm.name.trim().length > 0 &&
      createForm.slug.trim().length > 0 &&
      Number.isFinite(createForm.lat) &&
      Number.isFinite(createForm.long) &&
      Number.isFinite(createForm.allowedRadiusMeter) &&
      createForm.allowedRadiusMeter > 0
    );
  }, [createForm]);

  async function onCreate() {
    try {
      await createMerchant(
        {
          name: createForm.name.trim(),
          slug: createForm.slug.trim(),
          lat: createForm.lat,
          long: createForm.long,
          allowedRadiusMeter: createForm.allowedRadiusMeter,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["merchants-detailed"] });
          },
        }
      );
      toast.success("Merchant created");
      setIsCreateOpen(false);
      setCreateForm({
        name: "",
        slug: "",
        lat: 0,
        long: 0,
        allowedRadiusMeter: 500,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to create merchant";
      toast.error(message);
    }
  }

  if (isLoading) {
    return <div className="px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="px-4 py-8">Error: {error.message}</div>;
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-4 flex items-center justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create merchant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create merchant</DialogTitle>
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
                <Label htmlFor="create-slug">Slug</Label>
                <Input
                  id="create-slug"
                  value={createForm.slug}
                  onChange={(e) => setCreateForm((p) => ({ ...p, slug: e.target.value }))}
                  disabled={isCreating}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="create-lat">Latitude</Label>
                  <Input
                    id="create-lat"
                    type="number"
                    step="any"
                    value={createForm.lat}
                    onChange={(e) =>
                      setCreateForm((p) => ({ ...p, lat: Number(e.target.value) }))
                    }
                    disabled={isCreating}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="create-long">Longitude</Label>
                  <Input
                    id="create-long"
                    type="number"
                    step="any"
                    value={createForm.long}
                    onChange={(e) =>
                      setCreateForm((p) => ({ ...p, long: Number(e.target.value) }))
                    }
                    disabled={isCreating}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="create-radius">Allowed radius (meters)</Label>
                <Input
                  id="create-radius"
                  type="number"
                  value={createForm.allowedRadiusMeter}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, allowedRadiusMeter: Number(e.target.value) }))
                  }
                  disabled={isCreating}
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
        {data?.map((merchant) => (
          <MerchantCard
            key={merchant.id}
            merchant={merchant}
            onClick={() => navigate(`/merchants/${merchant.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
