import type { DetailedFrameResponseDto } from "@/api";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface Props {
  frame: DetailedFrameResponseDto;
  onClick: () => void;
}

export const FrameCard = ({ frame, onClick }: Props) => {
  return (
    <Card onClick={onClick}> 
      <CardHeader>
        <CardTitle className={frame.isActive ? "text-vintage-black" : "text-red-500"}>{frame.name} {!frame.isActive && "(Inactive)"}</CardTitle>
      </CardHeader>
    </Card>
  );
};
