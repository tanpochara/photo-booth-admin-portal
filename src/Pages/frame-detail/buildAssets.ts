import type { DetailedFrameResponseDto } from "@/api";
import type { FrameAssetItem } from "./types";

export function buildAssets(selectedFrame: DetailedFrameResponseDto): FrameAssetItem[] {
  return [
    { label: "sample image", value: selectedFrame.sampleImageUrl },
    { label: "frame", value: selectedFrame.stripBackgroundPath },
    { label: "gif frame", value: selectedFrame.gifFramePath },
    { label: "overlay", value: selectedFrame.frame.overlayPath },
    { label: "filter", value: selectedFrame.filterPath },
  ].filter((x) => Boolean(x.value)) as FrameAssetItem[];
}


