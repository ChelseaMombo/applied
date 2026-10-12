import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useApplications } from "../hooks/useApplications";
import { stageLabels } from "../lib/applications";
import type { NewApplication, Stage } from "../types";

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
    <section>
      <Link to="/">← Back to all applications</Link>
      <h2>Add an application</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="company">Company</label>
        <input
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
          <p id="company-error" role="alert">
            {errors.company.message}
          </p>
        )}

        <label htmlFor="role">Job title</label>
        <input
          id="role"
          {...register("role", {
            required: "Job title is required",
            minLength: { value: 2, message: "At least 2 characters" },
          })}
          aria-invalid={errors.role ? "true" : "false"}
          aria-describedby={errors.role ? "role-error" : undefined}
        />
        {errors.role && (
          <p id="role-error" role="alert">
            {errors.role.message}
          </p>
        )}

        <label htmlFor="link">Link to the advert (optional)</label>
        <input
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
          <p id="link-error" role="alert">
            {errors.link.message}
          </p>
        )}

        <label htmlFor="dateSent">Date sent</label>
        <input
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
          <p id="dateSent-error" role="alert">
            {errors.dateSent.message}
          </p>
        )}

        <label htmlFor="stage">Stage</label>
        <select id="stage" {...register("stage")}>
          {stages.map((s) => (
            <option key={s} value={s}>
              {stageLabels[s]}
            </option>
          ))}
        </select>

        <label htmlFor="notes">Notes (optional)</label>
        <textarea id="notes" {...register("notes")} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save application"}
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </section>
  );
}