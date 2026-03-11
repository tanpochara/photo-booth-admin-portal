import { useGetMerchantsDetailed } from "@/hooks/api/useGetMerchantsDetailed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { MerchantDetailHeader } from "./merchant-detail/MerchantDetailHeader";
import { MerchantOverviewTab } from "./merchant-detail/MerchantOverviewTab";
import { MerchantAssetsTab } from "./merchant-detail/MerchantAssetsTab";
import { MerchantFramesTab } from "./merchant-detail/MerchantFramesTab";

export const MerchantDetailPage = () => {
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMerchantsDetailed();

  const selectedMerchant = useMemo(() => {
    if (!merchantId || !data) return undefined;
    return data.find((m) => m.id === merchantId);
  }, [data, merchantId]);

  if (!merchantId) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Missing merchant id</CardTitle>
            <CardDescription>Go back and pick a merchant from the list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate("/merchants")}>
              Back to merchants
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
            <CardTitle>Couldn't load merchant</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/merchants")}>
              Back to merchants
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedMerchant) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Merchant not found</CardTitle>
            <CardDescription>We couldn't find a merchant with id: {merchantId}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate("/merchants")}>
              Back to merchants
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="flex flex-col gap-4">
        <MerchantDetailHeader merchantId={selectedMerchant.id} name={selectedMerchant.name} />

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="frames">Linked Frames</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <MerchantOverviewTab merchant={selectedMerchant} />
          </TabsContent>

          <TabsContent value="assets">
            <MerchantAssetsTab
              merchantId={selectedMerchant.id}
              backgroundUrl={selectedMerchant.backgroundUrl}
              avatarUrl={selectedMerchant.avatarUrl}
            />
          </TabsContent>

          <TabsContent value="frames">
            <MerchantFramesTab
              merchantId={selectedMerchant.id}
              childFrames={selectedMerchant.childFrames}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
