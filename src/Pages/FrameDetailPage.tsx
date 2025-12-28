import { useGetFrameDetailed } from "@/hooks/api/useGetFrameDetailed";
import { useFrameStore } from "@/lib/store/frameStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FrameDetailHeader } from "./frame-detail/FrameDetailHeader";
import { OverviewTab } from "./frame-detail/OverviewTab";
import { AssetsTab } from "./frame-detail/AssetsTab";
import { CoordinatesTab } from "./frame-detail/CoordinatesTab";
import { buildAssets } from "./frame-detail/buildAssets";

export const FrameDetailPage = () => {
  const { frameId } = useParams();
  const navigate = useNavigate();
  const { frames, setSelectedFrame } = useFrameStore();
  const { data, isLoading, error } = useGetFrameDetailed();

  const selectedFrame = useMemo(() => {
    if (!frameId) return undefined;
    return (
      data?.find((f) => f.id === frameId) ??
      frames.find((f) => f.id === frameId)
    );
  }, [data, frameId, frames]);

  useEffect(() => {
    if (selectedFrame) setSelectedFrame(selectedFrame);
  }, [selectedFrame, setSelectedFrame]);

  if (!frameId) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Missing frame id</CardTitle>
            <CardDescription>
              Go back and pick a frame from the list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to frames
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <div className="mx-auto w-full max-w-5xl px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Couldn’t load frame</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to frames
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedFrame) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Frame not found</CardTitle>
            <CardDescription>
              We couldn’t find a frame with id: {frameId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to frames
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const frame = selectedFrame.frame;
  const assets = buildAssets(selectedFrame);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="flex flex-col gap-4">
        <FrameDetailHeader frameId={selectedFrame.id} name={selectedFrame.name} isActive={selectedFrame.isActive} />

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="coordinates">Image coordinates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab frameId={selectedFrame.id} displayedName={selectedFrame.name} frame={frame} />
          </TabsContent>

          <TabsContent value="assets">
            <AssetsTab frameId={selectedFrame.id} assets={assets} overlayMode={frame.overlayMode} />
          </TabsContent>

          <TabsContent value="coordinates">
            <CoordinatesTab frameId={selectedFrame.id} coordinates={selectedFrame.imageCoordinates} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
