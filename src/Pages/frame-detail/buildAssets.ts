import type { DetailedFrameResponseDto } from "@/api";
import type { FrameAssetItem } from "./types";

export function buildAssets(selectedFrame: DetailedFrameResponseDto): FrameAssetItem[] {
  return [
    { label: "frame sample image (frames page)", value: selectedFrame.frameDetailSampleImageUrl },
    { label: "sample image (frame detail page)", value: selectedFrame.sampleImageUrl },
    { label: "frame", value: selectedFrame.stripBackgroundPath },
    { label: "gif frame", value: selectedFrame.gifFramePath },
    { label: "overlay", value: selectedFrame.frame.overlayPath },
    { label: "filter", value: selectedFrame.filterPath },
  ].filter((x) => Boolean(x.value)) as FrameAssetItem[];
}


