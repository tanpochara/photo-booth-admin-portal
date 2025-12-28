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
        <CardTitle>{frame.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};
