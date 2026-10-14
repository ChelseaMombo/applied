import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useApplications } from "../hooks/useApplications";
import { stageLabels } from "../lib/applications";
import { fieldClass } from "../components/fieldStyles";
import type { NewApplication, Stage } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function todayString(): string {
  return new Date().toLocaleDateString("en-CA");
}

export function NewApplicationPage() {
  const navigate = useNavigate();
  const { add } = useApplications();
  const stages = Object.keys(stageLabels) as Stage[];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewApplication>({
    defaultValues: {
      company: "",
      role: "",
      link: "",
      dateSent: todayString(),
      stage: "wishlist",
      notes: "",
    },
  });

  const companyRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    companyRef.current?.focus();
  }, []);

  const { ref: companyFormRef, ...companyField } = register("company", {
    required: "Company is required",
    minLength: { value: 2, message: "At least 2 characters" },
  });

  async function onSubmit(data: NewApplication) {
    await add({
      ...data,
      link: data.link?.trim() || undefined,
      notes: data.notes?.trim() || undefined,
    });
    navigate("/");
  }

  return (
    <section className="max-w-xl">
      <Link to="/" className="text-sm hover:underline">
        ← Back to all applications
      </Link>
      <h2 className="mb-4 mt-2 text-2xl font-bold">Add an application</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            {...companyField}
            ref={(el) => {
              companyFormRef(el);
              companyRef.current = el;
            }}
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" role="alert" className="text-sm text-destructive">
              {errors.company.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Job title</Label>
          <Input
            id="role"
            {...register("role", {
              required: "Job title is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
            aria-invalid={errors.role ? "true" : "false"}
            aria-describedby={errors.role ? "role-error" : undefined}
          />
          {errors.role && (
            <p id="role-error" role="alert" className="text-sm text-destructive">
              {errors.role.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="link">Link to the advert (optional)</Label>
          <Input
            id="link"
            {...register("link", {
              validate: (value) => {
                if (!value || !value.trim()) return true;
                try {
                  const url = new URL(value.trim());
                  return (
                    url.protocol === "http:" ||
                    url.protocol === "https:" ||
                    "That does not look like a link"
                  );
                } catch {
                  return "That does not look like a link";
                }
              },
            })}
            aria-invalid={errors.link ? "true" : "false"}
            aria-describedby={errors.link ? "link-error" : undefined}
          />
          {errors.link && (
            <p id="link-error" role="alert" className="text-sm text-destructive">
              {errors.link.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dateSent">Date sent</Label>
          <Input
            id="dateSent"
            type="date"
            {...register("dateSent", {
              required: "Date sent is required",
              validate: (value) =>
                value <= todayString() || "You cannot have sent it tomorrow",
            })}
            aria-invalid={errors.dateSent ? "true" : "false"}
            aria-describedby={errors.dateSent ? "dateSent-error" : undefined}
          />
          {errors.dateSent && (
            <p
              id="dateSent-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.dateSent.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="stage">Stage</Label>
          <select id="stage" className={fieldClass} {...register("stage")}>
            {stages.map((s) => (
              <option key={s} value={s}>
                {stageLabels[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <textarea
            id="notes"
            rows={4}
            className={fieldClass}
            {...register("notes")}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save application"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}