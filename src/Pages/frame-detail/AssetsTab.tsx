import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditAssetsRequestDto } from "@/api/models/EditAssetsRequestDto";
import { useEditFrameAsset } from "@/hooks/api/useEditFrameAsset";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { FrameAssetItem } from "./types";

type Props = {
  frameId: string;
  assets: Array<FrameAssetItem>;
  overlayMode?: string | null;
};

type AssetEditState = {
  sampleImageFile: File | null;
  stripBackgroundFile: File | null;
  gifFrameFile: File | null;
  filterFile: File | null;
  overlayFile: File | null;
  overlayMode: "" | EditAssetsRequestDto.overlayMode;
};

function buildAssetsFormData(edit: AssetEditState): FormData {
  const fd = new FormData();

  // Field names must match what your NestJS multer interceptor expects.
  if (edit.sampleImageFile) fd.append("sampleImage", edit.sampleImageFile);
  if (edit.stripBackgroundFile) fd.append("stripBackground", edit.stripBackgroundFile);
  if (edit.gifFrameFile) fd.append("gifFrame", edit.gifFrameFile);
  if (edit.filterFile) fd.append("filter", edit.filterFile);
  if (edit.overlayFile) fd.append("overlay", edit.overlayFile);

  // Non-file fields are still allowed in multipart.
  if (edit.overlayMode) fd.append("overlayMode", edit.overlayMode);

  return fd;
}

export function AssetsTab({ frameId, assets, overlayMode }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditFrameAsset();
  const [isEditing, setIsEditing] = useState(false);
  const [failedAssetPreview, setFailedAssetPreview] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    return assets
      .map((a) => ({ ...a, value: String(a.value) }))
      .filter((a) => Boolean(a.value));
  }, [assets]);

  const [edit, setEdit] = useState<AssetEditState>({
    sampleImageFile: null,
    stripBackgroundFile: null,
    gifFrameFile: null,
    filterFile: null,
    overlayFile: null,
    overlayMode: (overlayMode as EditAssetsRequestDto.overlayMode | null) ?? "",
  });

  function resetEditState() {
    setEdit({
      sampleImageFile: null,
      stripBackgroundFile: null,
      gifFrameFile: null,
      filterFile: null,
      overlayFile: null,
      overlayMode: (overlayMode as EditAssetsRequestDto.overlayMode | null) ?? "",
    });
  }

  async function onSave() {
    await mutateAsync(
      { frameId, formData: buildAssetsFormData(edit) },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["frame-detailed"] });
          setIsEditing(false);
          resetEditState();
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
        <CardDescription>Paths/URLs used to render or generate outputs for this frame.</CardDescription>
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
              <div className="text-sm text-muted-foreground">Sample image (upload)</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEdit((p) => ({ ...p, sampleImageFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Frame (upload)</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEdit((p) => ({ ...p, stripBackgroundFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">GIF frame (upload)</div>
              <Input
                type="file"
                accept="image/gif,image/*"
                onChange={(e) => setEdit((p) => ({ ...p, gifFrameFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Overlay (upload)</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEdit((p) => ({ ...p, overlayFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="text-sm text-muted-foreground">Filter (upload)</div>
              <Input
                type="file"
                onChange={(e) => setEdit((p) => ({ ...p, filterFile: e.target.files?.[0] ?? null }))}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="text-sm text-muted-foreground">Overlay mode</div>
              <Select
                value={edit.overlayMode}
                onValueChange={(value) => setEdit((p) => ({ ...p, overlayMode: value as "" | EditAssetsRequestDto.overlayMode }))}
                disabled={isPending}
              >
                <SelectTrigger className="w-full" aria-label="Overlay mode">
                  <SelectValue placeholder="Select overlay mode" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EditAssetsRequestDto.overlayMode).map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="space-y-3">
          {items.map((a) => {
            const url = a.value;
            const key = `${a.label}:${url}`;
            const failed = Boolean(failedAssetPreview[key]);

            return (
              <div key={key} className="space-y-2">
                <div className="text-sm text-muted-foreground">{a.label}</div>

                {!failed && (
                  <img
                    src={url}
                    alt={a.label}
                    className="w-full rounded-lg border object-contain"
                    loading="lazy"
                    onError={() => setFailedAssetPreview((prev) => ({ ...prev, [key]: true }))}
                  />
                )}

                {a.label === "overlay" && (
                  <>
                    <div className="text-sm text-muted-foreground">Overlay mode</div>
                    <div className="font-medium">{overlayMode || "-"}</div>
                  </>
                )}

                {/* keep the link behavior you had (only for filter), but we can expand later if desired */}
                {a.label === "filter" && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="block break-all rounded-md border bg-muted/30 px-3 py-2 font-mono text-sm hover:underline"
                  >
                    {url}
                  </a>
                )}
              </div>
            );
          })}
        </div>
        )}
      </CardContent>
    </Card>
  );
}


