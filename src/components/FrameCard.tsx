import type { DetailedFrameResponseDto } from "@/api";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Props {
  frame: DetailedFrameResponseDto;
  onClick: () => void;
}

export const FrameCard = ({ frame, onClick }: Props) => {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-center gap-3">
        {frame.frameDetailSampleImageUrl && (
          <img
            src={frame.frameDetailSampleImageUrl}
            alt={frame.name}
            className="h-10 w-10 shrink-0 rounded border object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <CardTitle className={`truncate ${frame.isActive ? "" : "text-red-500"}`}>
            {frame.name}{!frame.isActive && " (Inactive)"}
          </CardTitle>
          <div className="text-sm text-muted-foreground truncate">
            {frame.aspectRatio.replace(/_/g, " ").toLowerCase()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
            frame.frameType === "LOCATION"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
          }`}
        >
          {frame.frameType}
        </span>
      </CardContent>
    </Card>
  );
};
