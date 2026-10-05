import type { DetailedFrameResponseDto } from "@/api";
import { Star } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface Props {
  frame: DetailedFrameResponseDto;
  onClick: () => void;
}

export const FrameCard = ({ frame, onClick }: Props) => {
  return (
    <Card onClick={onClick}> 
      <CardHeader>
        <CardTitle className={`${frame.isActive ? "text-vintage-black" : "text-red-500"} flex items-center gap-2`}>
          <span>{frame.name} {!frame.isActive && "(Inactive)"}</span>
          {frame.isCollabFrame && (
            <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-500" aria-label="Collab frame" role="img" />
          )}
          <span className="text-sm font-normal text-muted-foreground">#{frame.sortOrder}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
