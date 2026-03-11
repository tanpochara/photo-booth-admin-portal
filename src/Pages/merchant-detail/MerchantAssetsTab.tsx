import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEditMerchantAssets } from "@/hooks/api/useEditMerchantAssets";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  merchantId: string;
  backgroundUrl?: string | null;
  avatarUrl?: string | null;
};

type AssetEditState = {
  backgroundImageFile: File | null;
  avatarImageFile: File | null;
};

function buildFormData(edit: AssetEditState): FormData {
  const fd = new FormData();
  if (edit.backgroundImageFile) fd.append("backgroundImage", edit.backgroundImageFile);
  if (edit.avatarImageFile) fd.append("avatarImage", edit.avatarImageFile);
  return fd;
}

export function MerchantAssetsTab({ merchantId, backgroundUrl, avatarUrl }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditMerchantAssets();
  const [isEditing, setIsEditing] = useState(false);
  const [failedPreview, setFailedPreview] = useState<Record<string, boolean>>({});

  const assets = useMemo(() => {
    return [
      { label: "Background", value: backgroundUrl },
      { label: "Avatar", value: avatarUrl },
    ].filter((a) => Boolean(a.value)) as Array<{ label: string; value: string }>;
  }, [backgroundUrl, avatarUrl]);

  const [edit, setEdit] = useState<AssetEditState>({
    backgroundImageFile: null,
    avatarImageFile: null,
  });

  function resetEditState() {
    setEdit({ backgroundImageFile: null, avatarImageFile: null });
  }

  async function onSave() {
    await mutateAsync(
      { merchantId, formData: buildFormData(edit) },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["merchants-detailed"] });
          toast.success("Merchant assets updated");
          setIsEditing(false);
          resetEditState();
        },
        onError: () => {
          toast.error("Failed to update merchant assets");
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
        <CardDescription>Background and avatar images for this merchant.</CardDescription>
        <CardAction>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetEditState();
                  setIsEditing(false);
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={onSave} disabled={isPending}>
                Save
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Background image (upload)</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEdit((p) => ({ ...p, backgroundImageFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Avatar image (upload)</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEdit((p) => ({ ...p, avatarImageFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
          </div>
        )}

        {!isEditing && (
          <>
            {assets.length === 0 ? (
              <div className="text-sm text-muted-foreground">No assets uploaded yet.</div>
            ) : (
              <Accordion type="multiple" className="w-full">
                {assets.map((a) => {
                  const key = `${a.label}:${a.value}`;
                  const failed = Boolean(failedPreview[key]);

                  return (
                    <AccordionItem key={key} value={key}>
                      <AccordionTrigger className="text-sm text-muted-foreground capitalize">
                        {a.label}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        {!failed && (
                          <img
                            src={a.value}
                            alt={a.label}
                            className="w-full rounded-lg border object-contain"
                            loading="lazy"
                            onError={() => setFailedPreview((prev) => ({ ...prev, [key]: true }))}
                          />
                        )}
                        {failed && (
                          <div className="text-sm text-muted-foreground">Failed to load image preview.</div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
