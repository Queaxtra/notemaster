<script lang="ts">
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic note-taking",
        "50 MB storage",
        "Web access",
        "Sync across 2 devices"
      ],
      color: "bg-cyan-100",
      borderColor: "border-cyan-300",
      buttonColor: "bg-cyan-500 hover:bg-cyan-600"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Advanced note-taking",
        "5 GB storage",
        "Web & mobile access",
        "Unlimited device sync",
        "Collaboration features"
      ],
      color: "bg-green-100",
      borderColor: "border-green-300",
      buttonColor: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "All Pro features",
        "Unlimited storage",
        "Priority support",
        "Custom integrations",
        "Advanced security"
      ],
      color: "bg-purple-100",
      borderColor: "border-purple-300",
      buttonColor: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  let activePlan = "Pro";
</script>

<section class="py-16 mt-20">
  <div class="container mx-auto px-4 max-w-6xl">
    <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
      <span class="relative inline-block px-2 py-1 bg-orange-200 rounded-lg">
        <span class="relative z-10">Choose Your Plan</span>
        <span class="absolute inset-0 bg-orange-200 transform -skew-x-6 rounded-lg"></span>
      </span>
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each plans as plan}
        <div class="flex flex-col {plan.color} p-6 rounded-lg shadow-lg border-2 {plan.borderColor} transition-all duration-300 {activePlan === plan.name ? 'transform scale-105' : ''}">
          <h3 class="text-xl font-extrabold mb-1 text-gray-700">{plan.name}</h3>
          <p class="text-2xl font-bold mb-2">{plan.price}</p>
          <p class="mb-6 text-sm">/{plan.period}</p>
          <ul class="mb-8 flex-grow">
            {#each plan.features as feature}
              <li class="flex items-center mb-2">
                <i class="ri-check-line mr-2 text-green-500"></i>
                <span class="text-gray-600">{feature}</span>
              </li>
            {/each}
          </ul>
          <button class="w-full py-2 px-4 rounded-lg text-white font-semibold {plan.buttonColor} text-sm transition-colors duration-300" on:click={() => activePlan = plan.name}>
            {activePlan === plan.name ? 'Current Plan' : 'Choose Plan'}
          </button>
        </div>
      {/each}
    </div>

    {#if activePlan}
      <div class="mt-8 p-6 rounded-lg {plans.find(p => p.name === activePlan)?.color} border-2 {plans.find(p => p.name === activePlan)?.borderColor} text-gray-700 shadow-lg text-sm">
        <h3 class="text-lg font-semibold mb-4">You're Currently on the {activePlan} Plan</h3>
        <p class="mb-4">You're enjoying all the benefits of the {activePlan} plan. To manage your subscription or upgrade to a different plan, click the button below.</p>
        <a href="/" class="inline-block py-2 px-4 {plans.find(p => p.name === activePlan)?.buttonColor} text-white rounded-lg font-semibold transition-colors duration-300">
          Upgrade
        </a>
      </div>
    {/if}
  </div>
</section>
