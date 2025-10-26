type Step = { key: string; label: string }

export default function StepDots({
  steps,
  current,                 // 1-based: 1,2,3...
}: {
  steps: Step[]
  current: number
}) {
  return (
    <div className="mb-6">
      <ol className="relative mx-auto grid max-w-2xl grid-cols-3 items-center gap-6">
        {steps.map((s, i) => {
          const index = i + 1
          const isActive = index === current
          const isDone = index < current

          return (
            <li key={s.key} className="flex flex-col items-center text-center">
              {/* connector line (links) */}
              {i > 0 && (
                <span
                  className={`absolute left-0 right-0 top-4 mx-[16.66%] h-0.5 ${
                    isDone ? "bg-emerald-600" : "bg-stone-300"
                  }`}
                  aria-hidden
                />
              )}

              {/* dot */}
              <span
                className={[
                  "z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                  isDone
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : isActive
                    ? "border-emerald-700 bg-white text-emerald-700 ring-4 ring-emerald-600/20"
                    : "border-stone-300 bg-white text-stone-500",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Stap ${index}: ${s.label}`}
              >
                {isDone ? "✓" : index}
              </span>

              {/* label */}
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive ? "text-emerald-700" : "text-stone-600"
                }`}
              >
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
