import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditFrameCoordinate } from "@/hooks/api/useEditFrameCoordinate";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { EditImageCoordinatesRequestDto } from "@/api";

type Coordinate = {
  // NOTE: backend edit API requires id; response model might not include it in generated types.
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
  imageCoordinateType: string;
};

type Props = {
  frameId: string;
  coordinates: Coordinate[];
};

export function CoordinatesTab({ frameId, coordinates }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditFrameCoordinate();
  const [isEditing, setIsEditing] = useState(false);

  const sorted = useMemo(() => {
    return coordinates.slice().sort((a, b) => a.imageIndex - b.imageIndex);
  }, [coordinates]);

  const canEdit = sorted.every((c) => typeof (c as any).id === "string" && (c as any).id.length > 0);

  const [draft, setDraft] = useState<Array<Required<Pick<Coordinate, "id" | "x" | "y" | "width" | "height" | "imageIndex" | "imageCoordinateType">>>>([]);

  function startEdit() {
    if (!canEdit) return;
    setDraft(
      sorted.map((c) => ({
        id: (c as any).id as string,
        x: c.x,
        y: c.y,
        width: c.width,
        height: c.height,
        imageIndex: c.imageIndex,
        imageCoordinateType: c.imageCoordinateType,
      }))
    );
    setIsEditing(true);
  }

  async function onSave() {
    const payload: EditImageCoordinatesRequestDto = {
      imageCoordinates: draft,
    };

    await mutateAsync(
      { frameId, coordinate: payload },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["frame-detailed"] });
          setIsEditing(false);
        },
      }
    );
  }

  if (coordinates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Image coordinates</CardTitle>
          <CardDescription>Placement of each captured image on the final output.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">No coordinates available.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image coordinates</CardTitle>
        <CardDescription>Placement of each captured image on the final output.</CardDescription>
        <div className="flex justify-end">
          {!isEditing ? (
            <Button variant="outline" onClick={startEdit} disabled={!canEdit}>
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
        </div>
        {!canEdit && (
          <div className="text-xs text-muted-foreground">
            Editing is disabled because the backend requires an <span className="font-mono">id</span> per coordinate.
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[60vh] rounded-md border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background">
              <tr className="border-b">
                <th className="p-3 text-left font-medium">Index</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">x</th>
                <th className="p-3 text-left font-medium">y</th>
                <th className="p-3 text-left font-medium">width</th>
                <th className="p-3 text-left font-medium">height</th>
              </tr>
            </thead>
            <tbody>
              {(isEditing ? draft : sorted).map((c, idx) => (
                <tr key={`${c.imageIndex}-${c.imageCoordinateType}-${idx}`} className="border-b">
                  <td className="p-3 font-mono">{c.imageIndex}</td>
                  <td className="p-3">{c.imageCoordinateType}</td>
                  <td className="p-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={c.x}
                        onChange={(e) =>
                          setDraft((prev) =>
                            prev.map((row, i) => (i === idx ? { ...row, x: Number(e.target.value) } : row))
                          )
                        }
                        disabled={isPending}
                      />
                    ) : (
                      <span className="font-mono">{c.x}</span>
                    )}
                  </td>
                  <td className="p-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={c.y}
                        onChange={(e) =>
                          setDraft((prev) =>
                            prev.map((row, i) => (i === idx ? { ...row, y: Number(e.target.value) } : row))
                          )
                        }
                        disabled={isPending}
                      />
                    ) : (
                      <span className="font-mono">{c.y}</span>
                    )}
                  </td>
                  <td className="p-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={c.width}
                        onChange={(e) =>
                          setDraft((prev) =>
                            prev.map((row, i) => (i === idx ? { ...row, width: Number(e.target.value) } : row))
                          )
                        }
                        disabled={isPending}
                      />
                    ) : (
                      <span className="font-mono">{c.width}</span>
                    )}
                  </td>
                  <td className="p-3">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={c.height}
                        onChange={(e) =>
                          setDraft((prev) =>
                            prev.map((row, i) => (i === idx ? { ...row, height: Number(e.target.value) } : row))
                          )
                        }
                        disabled={isPending}
                      />
                    ) : (
                      <span className="font-mono">{c.height}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}


