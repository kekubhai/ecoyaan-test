type Props = {
	currentStep: 1 | 2 | 3;
};

const steps = [
	{ id: 1, label: "Cart" },
	{ id: 2, label: "Shipping" },
	{ id: 3, label: "Payment" },
] as const;

export default function StepIndicator({ currentStep }: Props) {
	return (
		<div className="mb-6">
			<div className="flex items-center justify-between gap-2">
				{steps.map((step, index) => {
					const isActive = step.id === currentStep;
					const isCompleted = step.id < currentStep;

					return (
						<div key={step.id} className="flex min-w-0 flex-1 items-center">
							<div className="flex min-w-0 items-center gap-3">
								<div
									className={
										"flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold " +
										(isActive || isCompleted
											? "border-green-600 bg-green-600 text-white"
											: "border-gray-300 bg-white text-gray-500")
									}
									aria-current={isActive ? "step" : undefined}
								>
									{step.id}
								</div>
								<div
									className={
										"truncate text-sm font-medium " +
										(isActive || isCompleted ? "text-green-700" : "text-gray-500")
									}
								>
									{step.label}
								</div>
							</div>

							{index < steps.length - 1 ? (
								<div
									className={
										"mx-3 hidden h-px flex-1 sm:block " +
										(currentStep > step.id ? "bg-green-600" : "bg-gray-200")
									}
								/>
							) : null}
						</div>
					);
				})}
			</div>

			<div className="mt-3 h-px w-full bg-gray-200 sm:hidden" />
		</div>
	);
}

