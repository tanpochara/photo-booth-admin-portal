import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActiveCouponResponseDto } from "@/api";
import { useGetActiveCoupons } from "@/hooks/api/useGetActiveCoupons";
import { useGenerateCoupon } from "@/hooks/api/useGenerateCoupon";
import { useMarkCouponDistributed } from "@/hooks/api/useMarkCouponDistributed";
import { Copy, Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";

const CouponStatus = ActiveCouponResponseDto.couponStatus;

const formatDateToGMT7 = (utcDateString: string | null): string => {
  if (!utcDateString) return "-";

  const date = new Date(utcDateString);
  return date.toLocaleString("en-GB", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const StatusBadge = ({
  status,
}: {
  status: ActiveCouponResponseDto.couponStatus;
}) => {
  switch (status) {
    case CouponStatus.ACTIVE:
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-950 dark:text-green-400 dark:ring-green-500/30">
          Active
        </span>
      );
    case CouponStatus.DISTRIBUTED:
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950 dark:text-amber-400 dark:ring-amber-500/30">
          Distributed
        </span>
      );
    case CouponStatus.USED:
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-950 dark:text-red-400 dark:ring-red-500/30">
          Used
        </span>
      );
  }
};

export const CouponListPage = () => {
  const { data: coupons, isLoading } = useGetActiveCoupons();
  const { mutateAsync: generateCoupon, isPending: isGenerating } =
    useGenerateCoupon();
  const { mutateAsync: markDistributed, isPending: isDistributing } =
    useMarkCouponDistributed();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [copyCount, setCopyCount] = useState(1);

  const activeCoupons = useMemo(
    () =>
      coupons?.filter((c) => c.couponStatus === CouponStatus.ACTIVE) ?? [],
    [coupons],
  );

  const handleGenerateCoupon = async () => {
    try {
      await generateCoupon();
      toast.success("Coupon generated!");
    } catch {
      toast.error("Failed to generate coupon");
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success("Coupon code copied and marked as distributed!");
      setTimeout(() => setCopiedCode(null), 2000);
      await markDistributed([code]);
    } catch {
      toast.error("Failed to copy coupon code");
    }
  };

  const handleBatchCopy = async () => {
    const codesToCopy = activeCoupons.slice(0, copyCount).map((c) => c.code);
    if (codesToCopy.length === 0) return;

    try {
      await navigator.clipboard.writeText(codesToCopy.join("\n"));
      await markDistributed(codesToCopy);
      toast.success(
        `${codesToCopy.length} coupon(s) copied and marked as distributed!`,
      );
      setIsCopyDialogOpen(false);
    } catch {
      toast.error("Failed to copy and distribute coupons");
    }
  };

  const openCopyDialog = () => {
    setCopyCount(activeCoupons.length);
    setIsCopyDialogOpen(true);
  };

  const canBatchCopy =
    copyCount > 0 && copyCount <= activeCoupons.length && !isDistributing;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Active Coupons</h1>

        <div className="flex items-center gap-2">
          <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={openCopyDialog}
                disabled={activeCoupons.length === 0}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Coupons
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Copy coupons</DialogTitle>
                <DialogDescription>
                  Copy the first N active coupons to your clipboard and mark
                  them as distributed.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-2">
                <Label htmlFor="copy-count">
                  Number of coupons ({activeCoupons.length} available)
                </Label>
                <Input
                  id="copy-count"
                  type="number"
                  min={1}
                  max={activeCoupons.length}
                  value={copyCount}
                  onChange={(e) => setCopyCount(Number(e.target.value))}
                  disabled={isDistributing}
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCopyDialogOpen(false)}
                  disabled={isDistributing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBatchCopy}
                  disabled={!canBatchCopy}
                >
                  {isDistributing ? "Copying..." : "Copy & Distribute"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            onClick={handleGenerateCoupon}
            disabled={isGenerating}
          >
            <Plus className="h-3.5 w-3.5" />
            {isGenerating ? "Generating..." : "Generate Coupon"}
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coupon Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Used At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading coupons...
                </TableCell>
              </TableRow>
            )}

            {coupons && coupons.length === 0 && !isLoading && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No active coupons found.
                </TableCell>
              </TableRow>
            )}

            {coupons &&
              coupons.length > 0 &&
              !isLoading &&
              coupons.map((coupon) => {
                const isActive =
                  coupon.couponStatus === CouponStatus.ACTIVE;

                return (
                  <TableRow key={coupon.code}>
                    <TableCell className="font-mono text-sm font-medium">
                      {coupon.code}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={coupon.couponStatus} />
                    </TableCell>
                    <TableCell>
                      {formatDateToGMT7(coupon.createdAt)}
                    </TableCell>
                    <TableCell>
                      {formatDateToGMT7(coupon.usedAt ?? null)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(coupon.code)}
                        disabled={!isActive}
                        className="h-8 gap-1.5"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>

      {coupons && (
        <div className="mt-4 text-sm text-muted-foreground">
          Total coupons: {coupons.length}
        </div>
      )}
    </div>
  );
};
