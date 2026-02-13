import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetFrameDetailed } from "@/hooks/api/useGetFrameDetailed";
import { useGetPhotoResults } from "@/hooks/api/useGetPhotoResults";
import { useReprocessPhoto } from "@/hooks/api/useReprocessPhoto";
import { ReprocessResultDialog } from "@/components/ReprocessResultDialog";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

interface SearchFormState {
  createdAfter: string;
  childFrameId: string;
}

const formatDateTimeWithTimezone = (datetimeLocal: string): string => {
  // datetime-local gives "YYYY-MM-DDTHH:mm", append seconds and GMT+7 offset
  return `${datetimeLocal}:00+07:00`;
};

const formatDateToGMT7 = (utcDateString: string | null): string => {
  if (!utcDateString) return "-";

  const date = new Date(utcDateString);
  // Format with GMT+7 timezone (Asia/Bangkok)
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

export const SearchResultPage = () => {
  const { data: frames, isLoading: framesLoading } = useGetFrameDetailed();
  const { mutateAsync: searchResults, data, isPending } = useGetPhotoResults();
  const { mutateAsync: reprocessPhoto, isPending: isReprocessing } =
    useReprocessPhoto();

  const [formState, setFormState] = useState<SearchFormState>({
    createdAfter: "",
    childFrameId: "",
  });

  const [reprocessingJobId, setReprocessingJobId] = useState<string | null>(
    null
  );
  const [reprocessedJobId, setReprocessedJobId] = useState<string | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const canSubmit = useMemo(() => {
    return formState.createdAfter.trim().length > 0;
  }, [formState.createdAfter]);

  async function onSearch() {
    try {
      const isoDate = formatDateTimeWithTimezone(formState.createdAfter);

      await searchResults({
        createdAfter: isoDate,
        childFrameId: formState.childFrameId || undefined,
      });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to search results";
      toast.error(message);
    }
  }

  async function handleReprocess(jobId: string, createdAt: string) {
    try {
      setReprocessingJobId(jobId);
      toast.info("Reprocessing job...");

      const result = await reprocessPhoto({
        jobId,
        date: createdAt,
      });

      setReprocessedJobId(result.jobId);
      setDialogOpen(true);
      toast.success("Job reprocessed successfully!");
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to reprocess job";
      toast.error(message);
    } finally {
      setReprocessingJobId(null);
    }
  }

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setReprocessedJobId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>

      {/* Search Form */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div className="grid gap-2">
          <Label htmlFor="created-after">Created After *</Label>
          <Input
            id="created-after"
            type="datetime-local"
            value={formState.createdAfter}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, createdAfter: e.target.value }))
            }
            disabled={isPending}
            className="w-[220px]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="frame-select">Frame (Optional)</Label>
          <Select
            value={formState.childFrameId}
            onValueChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                childFrameId: value === "all" ? "" : value,
              }))
            }
            disabled={isPending || framesLoading}
          >
            <SelectTrigger id="frame-select" className="w-[200px]">
              <SelectValue placeholder="All frames" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All frames</SelectItem>
              {frames?.filter((frame) => frame.isActive).map((frame) => (
                <SelectItem key={frame.id} value={frame.id}>
                  {frame.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onSearch} disabled={!canSubmit || isPending}>
          {isPending ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Results Section */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created At</TableHead>
              {/* <TableHead>Used At</TableHead> */}
              <TableHead>Frame Name</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Loading state */}
            {isPending && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Searching...
                </TableCell>
              </TableRow>
            )}

            {/* Initial state - no search yet */}
            {!data && !isPending && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Enter search criteria and click Search to view results.
                </TableCell>
              </TableRow>
            )}

            {/* Empty results */}
            {data && data.results.length === 0 && !isPending && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No results found for the selected criteria.
                </TableCell>
              </TableRow>
            )}

            {/* Results */}
            {data &&
              data.results.length > 0 &&
              !isPending &&
              data.results.map((result, index) => (
                <TableRow key={result.jobId ?? `row-${index}`}>
                  <TableCell>{formatDateToGMT7(result.createdAt)}</TableCell>
                  {/* <TableCell>{formatDateToGMT7(result.usedAt)}</TableCell> */}
                  <TableCell>{result.childFrameName}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {result.jobId ? (
                      <a
                        href={`https://keptscene.com/result?jobId=${result.jobId}`}
                        className="text-blue-500 hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`link (${result.jobId.substring(0, 4)}...)`}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {result.jobId ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleReprocess(result.jobId!, result.createdAt)
                        }
                        disabled={
                          isReprocessing && reprocessingJobId === result.jobId
                        }
                      >
                        <RefreshCw
                          className={`h-4 w-4 mr-2 ${
                            reprocessingJobId === result.jobId
                              ? "animate-spin"
                              : ""
                          }`}
                        />
                        {reprocessingJobId === result.jobId
                          ? "Processing..."
                          : "Reprocess"}
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Total count */}
      {data && (
        <div className="mt-4 text-sm text-muted-foreground">
          Total results: {data.total}
        </div>
      )}

      {/* Reprocess Result Dialog */}
      {reprocessedJobId && (
        <ReprocessResultDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          newJobId={reprocessedJobId}
        />
      )}
    </div>
  );
};
