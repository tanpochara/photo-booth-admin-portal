import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToggleFrameActiveStatus } from "@/hooks/api/useToggleFrameActiveStatus";
import { useDeleteFrame } from "@/hooks/api/useDeleteFrame";
import { FrameDetailHeader } from "./FrameDetailHeader";
import { useNavigate } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";

vi.mock("@/hooks/api/useToggleFrameActiveStatus", () => ({
  useToggleFrameActiveStatus: vi.fn(),
}));

vi.mock("@/hooks/api/useDeleteFrame", () => ({
  useDeleteFrame: vi.fn(),
}));

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

const navigate = vi.fn();
const toggleFrameActiveStatus = vi.fn();
const deleteFrame = vi.fn(
  (_frameId: string, options?: { onSuccess?: () => void }) => {
    options?.onSuccess?.();
  },
);

function renderHeader(isActive: boolean) {
  const queryClient = new QueryClient();
  const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

  render(
    <QueryClientProvider client={queryClient}>
      <FrameDetailHeader
        frameId="child-frame-123"
        name="Summer Frame"
        isActive={isActive}
      />
    </QueryClientProvider>,
  );

  return { invalidateQueries };
}

beforeEach(() => {
  vi.mocked(useToggleFrameActiveStatus).mockReturnValue({
    mutate: toggleFrameActiveStatus,
  } as unknown as ReturnType<typeof useToggleFrameActiveStatus>);
  vi.mocked(useDeleteFrame).mockReturnValue({
    mutate: deleteFrame,
  } as unknown as ReturnType<typeof useDeleteFrame>);
  vi.mocked(useNavigate).mockReturnValue(navigate);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("FrameDetailHeader", () => {
  it("shows Disable and Delete for an active frame", () => {
    renderHeader(true);

    expect(screen.getByRole("button", { name: "Disable" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Activate" }),
    ).toBeNull();
  });

  it("shows Activate and Delete for an inactive frame", () => {
    renderHeader(false);

    expect(screen.getByRole("button", { name: "Activate" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
  });

  it("opens a confirmation dialog when Delete is clicked", () => {
    renderHeader(true);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByRole("alertdialog")).toBeTruthy();
    expect(screen.getByText("Delete frame?")).toBeTruthy();
    expect(screen.getByText(/permanently removes this frame/i)).toBeTruthy();
  });

  it("deletes the frame and returns to the list after confirmation", () => {
    const { invalidateQueries } = renderHeader(true);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    fireEvent.click(
      within(screen.getByRole("alertdialog")).getByRole("button", {
        name: "Delete",
      }),
    );

    expect(deleteFrame).toHaveBeenCalledWith(
      "child-frame-123",
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["frame-detailed"],
    });
    expect(toast.success).toHaveBeenCalledWith("Frame deleted");
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("does not delete the frame when confirmation is cancelled", () => {
    renderHeader(true);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    fireEvent.click(
      within(screen.getByRole("alertdialog")).getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(deleteFrame).not.toHaveBeenCalled();
  });
});
