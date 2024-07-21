<script>
  const features = [
    {
      title: ["Easy", "Note-Taking"],
      description: "Instantly save your notes with our fast and simple interface.",
      color: "bg-green-300",
    },
    {
      title: ["Smart", "Organization"],
      description: "Keep your notes organized with categories and tags.",
      color: "bg-blue-300",
    },
    {
      title: ["Access", "Everywhere"],
      description: "Instantly access your notes from all your devices.",
      color: "bg-red-300",
    }
  ];
</script>

<section class="py-16 mt-20">
  <div class="container mx-auto px-4 max-w-4xl">
    <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Why NoteMaster?</h2>
    <div>
      {#each features as feature, index}
        <div class="flex flex-col md:flex-row items-center {index % 2 === 0 ? '' : 'md:flex-row-reverse'}">
          <div class="w-full md:w-1/2 mb-8 md:mb-0 {index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}">
            <h3 class="text-2xl font-extrabold mb-4 text-gray-700 flex items-center">
              {feature.title[0]} 
              <span class="relative inline-block px-2 py-1 ml-2 {feature.color} rounded-lg">
                <span class="relative z-10">{feature.title[1]}</span>
                <span class="absolute inset-0 {feature.color} transform -skew-x-6 rounded-lg"></span>
              </span>
            </h3>
            <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-all duration-300">
              <p class="text-gray-600">{feature.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
