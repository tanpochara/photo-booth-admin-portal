import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  frame: {
    id: string;
    name: string;
    layout?: string | null;
    imagesCount: number;
    replaceBackgroundPrompt?: string | null;
  };
};

export function OverviewTab({ frame }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Basic metadata about this frame.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Name</div>
            <div className="font-medium">{frame.name}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">ID</div>
            <div className="font-mono text-sm">{frame.id}</div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="text-sm text-muted-foreground">Layout</div>
            <div className="font-medium">{frame.layout || "-"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Images count</div>
            <div className="font-medium">{frame.imagesCount}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Replace background prompt</div>
            <div className="font-medium">{frame.replaceBackgroundPrompt || "-"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


