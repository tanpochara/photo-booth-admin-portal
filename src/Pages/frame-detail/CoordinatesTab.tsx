import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditFrameCoordinate } from "@/hooks/api/useEditFrameCoordinate";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { EditImageCoordinateRequestDto, type EditImageCoordinatesRequestDto, type ImageCoordinateResponseDto } from "@/api";

type Coordinate = ImageCoordinateResponseDto & {
  imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType | string;
};

type DraftCoordinate = {
  id: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
  imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType;
};

type Props = {
  frameId: string;
  coordinates: Coordinate[];
  imagesCount: number;
};

function buildValidation(draft: DraftCoordinate[], imagesCount: number): string[] {
  const errors: string[] = [];
  const normal = draft.filter((c) => c.imageCoordinateType === EditImageCoordinateRequestDto.imageCoordinateType.NORMAL);
  const gif = draft.filter((c) => c.imageCoordinateType === EditImageCoordinateRequestDto.imageCoordinateType.GIF);

  const normalIndexes = normal.map((c) => c.imageIndex);
  const uniqueNormalIndexes = new Set(normalIndexes);

  // Rule 1: NORMAL count must match imagesCount and cover 0..imagesCount-1
  for (const idx of normalIndexes) {
    if (!Number.isInteger(idx)) errors.push(`NORMAL imageIndex must be an integer (got ${idx}).`);
    if (idx < 0 || idx >= imagesCount) errors.push(`NORMAL imageIndex out of range: ${idx}. Expected 0..${imagesCount - 1}.`);
  }
  if (uniqueNormalIndexes.size !== normalIndexes.length) errors.push("NORMAL imageIndex values must be unique.");
  for (let i = 0; i < imagesCount; i++) {
    if (!uniqueNormalIndexes.has(i)) errors.push(`Missing NORMAL coordinate for imageIndex ${i}.`);
  }
  if (normal.length !== imagesCount) errors.push(`Expected ${imagesCount} NORMAL coordinates, got ${normal.length}.`);

  // Rule 2: exactly 1 GIF
  if (gif.length !== 1) errors.push(`Expected exactly 1 GIF coordinate, got ${gif.length}.`);

  return errors;
}

export function CoordinatesTab({ frameId, coordinates, imagesCount }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditFrameCoordinate();
  const [isEditing, setIsEditing] = useState(false);
  const isEmpty = coordinates.length === 0;

  const sorted = useMemo(() => {
    return coordinates.slice().sort((a, b) => a.imageIndex - b.imageIndex);
  }, [coordinates]);

  const [draft, setDraft] = useState<DraftCoordinate[]>([]);

  const validationErrors = useMemo(() => {
    if (!isEditing) return [];
    return buildValidation(draft, imagesCount);
  }, [draft, imagesCount, isEditing]);

  const canSave = isEditing && validationErrors.length === 0 && !isPending;

  function startEdit() {
    setDraft(
      sorted.map((c) => ({
        id: c.id ?? null,
        x: c.x,
        y: c.y,
        width: c.width,
        height: c.height,
        imageIndex: c.imageIndex,
        imageCoordinateType: (c.imageCoordinateType as EditImageCoordinateRequestDto.imageCoordinateType) ?? EditImageCoordinateRequestDto.imageCoordinateType.NORMAL,
      }))
    );
    setIsEditing(true);
  }

  function createTemplateAndEdit() {
    const normal: DraftCoordinate[] = Array.from({ length: imagesCount }).map((_, i) => ({
      id: null,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      imageIndex: i,
      imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType.NORMAL,
    }));

    const gif: DraftCoordinate = {
      id: null,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      imageIndex: 0,
      imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType.GIF,
    };

    setDraft([...normal, gif]);
    setIsEditing(true);
  }

  function addMissingNormal() {
    const used = new Set(
      draft
        .filter((c) => c.imageCoordinateType === EditImageCoordinateRequestDto.imageCoordinateType.NORMAL)
        .map((c) => c.imageIndex)
    );
    let next = -1;
    for (let i = 0; i < imagesCount; i++) {
      if (!used.has(i)) {
        next = i;
        break;
      }
    }
    if (next === -1) return;
    setDraft((prev) => [
      ...prev,
      {
        id: null,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        imageIndex: next,
        imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType.NORMAL,
      },
    ]);
  }

  function addGif() {
    const hasGif = draft.some((c) => c.imageCoordinateType === EditImageCoordinateRequestDto.imageCoordinateType.GIF);
    if (hasGif) return;
    setDraft((prev) => [
      ...prev,
      {
        id: null,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        imageIndex: 0,
        imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType.GIF,
      },
    ]);
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

  // Only allow "creation" when coordinates do not exist yet.
  if (isEmpty && !isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Image coordinates</CardTitle>
          <CardDescription>Placement of each captured image on the final output.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              No coordinates available yet. Create the default coordinate set (NORMAL 0..{imagesCount - 1} + 1 GIF) and then adjust values.
            </div>
            <Button variant="outline" onClick={createTemplateAndEdit} disabled={isPending}>
              Create coordinates
            </Button>
          </div>
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
            <Button variant="outline" onClick={startEdit}>Edit</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={!canSave}>
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Coordinate creation helpers only in the "empty" case */}
        {isEditing && isEmpty && (
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={addMissingNormal} disabled={isPending}>
              Add missing NORMAL
            </Button>
            <Button variant="outline" onClick={addGif} disabled={isPending}>
              Add GIF
            </Button>
          </div>
        )}

        {isEditing && validationErrors.length > 0 && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">
            <div className="mb-2 font-medium">Fix these before saving:</div>
            <ul className="list-disc pl-5">
              {validationErrors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

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
                  <td className="p-3">
                    {isEditing && isEmpty ? (
                      <Select
                        value={c.imageCoordinateType}
                        onValueChange={(value) =>
                          setDraft((prev) =>
                            prev.map((row, i) =>
                              i === idx
                                ? {
                                    ...row,
                                    imageCoordinateType: value as EditImageCoordinateRequestDto.imageCoordinateType,
                                  }
                                : row
                            )
                          )
                        }
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(EditImageCoordinateRequestDto.imageCoordinateType).map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      String(c.imageCoordinateType)
                    )}
                  </td>
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


