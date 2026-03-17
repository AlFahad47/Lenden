import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  TestimonialAuthor,
} from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const hasHeader = Boolean(title || description);
  const cleanTestimonials = testimonials.filter((item) => item.text?.trim());
  const firstRow = cleanTestimonials.filter((_, index) => index % 2 === 0);
  const secondRow = cleanTestimonials.filter((_, index) => index % 2 === 1);
  const bottomRow = secondRow.length > 0 ? secondRow : firstRow;
  const loopTopRow = [...firstRow, ...firstRow];
  const loopBottomRow = [...bottomRow, ...bottomRow];

  return (
    <section className={cn("text-foreground px-0 py-0", className)}>
      <div className="mx-auto flex w-full max-w-container flex-col items-center gap-6 text-center sm:gap-10">
        {hasHeader && (
          <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
            {title && (
              <h2 className="max-w-180 text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md max-w-150 font-medium text-muted-foreground sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative flex w-full flex-col gap-4 overflow-hidden">
          <div className="group relative flex overflow-hidden p-2 [--gap:1rem] [--duration:48s]">
            <div className="marquee-track marquee-left flex shrink-0 flex-row justify-around gap-(--gap) group-hover:paused">
              {loopTopRow.map((testimonial, i) => (
                <TestimonialCard key={`top-${i}`} {...testimonial} />
              ))}
            </div>
          </div>

          <div className="group relative flex overflow-hidden p-2 [--gap:1rem] [--duration:50s]">
            <div className="marquee-track marquee-right flex shrink-0 flex-row justify-around gap-(--gap) group-hover:paused">
              {loopBottomRow.map((testimonial, i) => (
                <TestimonialCard key={`bottom-${i}`} {...testimonial} />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-linear-to-r from-[#F0F7FF] dark:from-[#040911] sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-linear-to-l from-[#F0F7FF] dark:from-[#040911] sm:block" />
        </div>
      </div>
    </section>
  );
}
