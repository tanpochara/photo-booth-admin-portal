import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { FramesService } from "@/api";
import { describe, expect, it, vi } from "vitest";
import { useDeleteFrame } from "./useDeleteFrame";

vi.mock("@/api", () => ({
  FramesService: {
    framesControllerDeleteFrame: vi.fn(),
  },
}));

describe("useDeleteFrame", () => {
  it("calls the delete endpoint for the provided frame id", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useDeleteFrame(), { wrapper });

    await result.current.mutateAsync("child-frame-123");

    expect(FramesService.framesControllerDeleteFrame).toHaveBeenCalledWith(
      "child-frame-123",
    );
  });
});
