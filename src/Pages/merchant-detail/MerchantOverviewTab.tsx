import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEditMerchantOverview } from "@/hooks/api/useEditMerchantOverview";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { DetailedMerchantResponseDto, EditMerchantOverviewRequestDto } from "@/api";
import { toast } from "sonner";

type Props = {
  merchant: DetailedMerchantResponseDto;
};

export function MerchantOverviewTab({ merchant }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditMerchantOverview();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<EditMerchantOverviewRequestDto>({
    name: merchant.name,
    slug: merchant.slug,
    allowedRadiusMeter: merchant.allowedRadiusMeter,
    lat: merchant.location.lat,
    long: merchant.location.long,
  });

  useEffect(() => {
    if (!isEditing) {
      setForm({
        name: merchant.name,
        slug: merchant.slug,
        allowedRadiusMeter: merchant.allowedRadiusMeter,
        lat: merchant.location.lat,
        long: merchant.location.long,
      });
    }
  }, [merchant.name, merchant.slug, merchant.allowedRadiusMeter, merchant.location.lat, merchant.location.long, isEditing]);

  async function onSave() {
    await mutateAsync(
      { merchantId: merchant.id, overview: form },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["merchants-detailed"] });
          toast.success("Merchant overview updated");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Failed to update merchant overview");
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Basic metadata about this merchant.</CardDescription>
        <CardAction>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={isPending}>
                Save
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">ID</div>
            <div className="font-mono text-sm">{merchant.id}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Name</div>
            {isEditing ? (
              <Input
                value={form.name ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                disabled={isPending}
              />
            ) : (
              <div className="font-medium">{merchant.name}</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Slug</div>
            {isEditing ? (
              <Input
                value={form.slug ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                disabled={isPending}
              />
            ) : (
              <div className="font-mono text-sm">{merchant.slug}</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Allowed Radius</div>
            {isEditing ? (
              <div className="relative">
                <Input
                  type="number"
                  value={form.allowedRadiusMeter ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      allowedRadiusMeter: e.target.value === "" ? undefined : Number(e.target.value),
                    }))
                  }
                  disabled={isPending}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  meters
                </span>
              </div>
            ) : (
              <div className="font-medium">{merchant.allowedRadiusMeter} meters</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Latitude</div>
            {isEditing ? (
              <Input
                type="number"
                step="any"
                value={form.lat ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    lat: e.target.value === "" ? undefined : Number(e.target.value),
                  }))
                }
                disabled={isPending}
              />
            ) : (
              <div className="font-mono text-sm">{merchant.location.lat}</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Longitude</div>
            {isEditing ? (
              <Input
                type="number"
                step="any"
                value={form.long ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    long: e.target.value === "" ? undefined : Number(e.target.value),
                  }))
                }
                disabled={isPending}
              />
            ) : (
              <div className="font-mono text-sm">{merchant.location.long}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
