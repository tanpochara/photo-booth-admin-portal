import type { DetailedMerchantResponseDto } from "@/api";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Props {
  merchant: DetailedMerchantResponseDto;
  onClick: () => void;
}

export const MerchantCard = ({ merchant, onClick }: Props) => {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-center gap-3">
        {merchant.avatarUrl && (
          <img
            src={merchant.avatarUrl}
            alt={merchant.name}
            className="h-10 w-10 rounded-full object-cover border"
          />
        )}
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate">{merchant.name}</CardTitle>
          <div className="text-sm text-muted-foreground truncate">{merchant.slug}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-muted-foreground">
          {merchant.childFrames.length} linked frame{merchant.childFrames.length !== 1 ? "s" : ""}
        </div>
      </CardContent>
    </Card>
  );
};
