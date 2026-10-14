import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { NewApplicationPage } from "./NewApplicationPage";

vi.mock("../hooks/useApplications", () => ({
  useApplications: () => ({ add: vi.fn() }),
}));

describe("NewApplicationPage", () => {
  it("shows an error under each required field when submitted empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NewApplicationPage />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Save application" }));

    expect(await screen.findByText("Company is required")).toBeInTheDocument();
    expect(screen.getByText("Job title is required")).toBeInTheDocument();
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.getByLabelText("Company")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});