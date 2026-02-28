import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetActiveCoupons } from "@/hooks/api/useGetActiveCoupons";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

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

export const CouponListPage = () => {
  const { data: coupons, isLoading } = useGetActiveCoupons();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success("Coupon code copied!");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      toast.error("Failed to copy coupon code");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Active Coupons</h1>

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
            {/* Loading state */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading coupons...
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
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

            {/* Data rows */}
            {coupons &&
              coupons.length > 0 &&
              !isLoading &&
              coupons.map((coupon) => (
                <TableRow key={coupon.code}>
                  <TableCell className="font-mono text-sm font-medium">
                    {coupon.code}
                  </TableCell>
                  <TableCell>
                    {coupon.usedAt ? (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-950 dark:text-red-400 dark:ring-red-500/30">
                        Used
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-950 dark:text-green-400 dark:ring-green-500/30">
                        Available
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDateToGMT7(coupon.createdAt)}</TableCell>
                  <TableCell>
                    {formatDateToGMT7(coupon.usedAt ?? null)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(coupon.code)}
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
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Total count */}
      {coupons && (
        <div className="mt-4 text-sm text-muted-foreground">
          Total coupons: {coupons.length}
        </div>
      )}
    </div>
  );
};
