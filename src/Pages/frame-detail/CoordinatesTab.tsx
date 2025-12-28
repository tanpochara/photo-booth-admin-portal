import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Coordinate = {
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
  imageCoordinateType: string;
};

type Props = {
  coordinates: Coordinate[];
};

export function CoordinatesTab({ coordinates }: Props) {
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
              {coordinates
                .slice()
                .sort((a, b) => a.imageIndex - b.imageIndex)
                .map((c, idx) => (
                  <tr key={`${c.imageIndex}-${c.imageCoordinateType}-${idx}`} className="border-b">
                    <td className="p-3 font-mono">{c.imageIndex}</td>
                    <td className="p-3">{c.imageCoordinateType}</td>
                    <td className="p-3 font-mono">{c.x}</td>
                    <td className="p-3 font-mono">{c.y}</td>
                    <td className="p-3 font-mono">{c.width}</td>
                    <td className="p-3 font-mono">{c.height}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}


