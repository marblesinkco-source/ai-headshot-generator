import { Camera, Image, Clock, DollarSign } from "lucide-react";

const metrics = [
  {
    icon: Camera,
    value: "11+ Photo Categories",
    description: "Professional, creative & lifestyle",
  },
  {
    icon: Image,
    value: "40+ Photos Per Session",
    description: "Multiple styles and backgrounds",
  },
  {
    icon: Clock,
    value: "~2 Hour Delivery",
    description: "Same-day turnaround",
  },
  {
    icon: DollarSign,
    value: "$9.90 Starting Price",
    description: "Save up to 95% vs studios",
  },
] as const;

export function SocialProofBar() {
  return (
    <section className="w-full bg-tp-paper border-y border-tp-line">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-5">
        <div className="grid grid-cols-2 gap-y-5 gap-x-4 sm:grid-cols-4 sm:gap-x-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.value}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex-shrink-0">
                  <Icon
                    className="h-5 w-5 text-tp-bronze-ink"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-tp-ink text-sm leading-tight">
                    {metric.value}
                  </p>
                  <p className="text-xs text-tp-muted mt-0.5 leading-snug">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
