import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import type { FrameAssetItem } from "./types";

type Props = {
  assets: Array<FrameAssetItem>;
  overlayMode?: string | null;
};

export function AssetsTab({ assets, overlayMode }: Props) {
  const [failedAssetPreview, setFailedAssetPreview] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    return assets
      .map((a) => ({ ...a, value: String(a.value) }))
      .filter((a) => Boolean(a.value));
  }, [assets]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
        <CardDescription>Paths/URLs used to render or generate outputs for this frame.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
    </Card>
  );
}


