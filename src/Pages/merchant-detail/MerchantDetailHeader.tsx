import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";

type Props = {
  merchantId: string;
  name: string;
};

export function MerchantDetailHeader({ merchantId, name }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-muted-foreground">Merchant</div>
          <div className="truncate text-2xl font-semibold">{name}</div>
          <div className="truncate text-sm text-muted-foreground">{merchantId}</div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => navigate("/merchants")}>
            Back
          </Button>
        </div>
      </div>

      <Separator />
    </>
  );
}
