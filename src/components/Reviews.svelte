<script lang="ts">
  const reviews = [
    {
      name: "John D.",
      review: "NoteMaster has simplified my life. Now all my notes are organized and accessible from anywhere.",
      rating: 5
    },
    {
      name: "Sarah M.",
      review: "Very easy to use and practical. I especially love the tagging feature.",
      rating: 4
    },
    {
      name: "Michael B.",
      review: "My productivity increased after switching to the premium version. Highly recommended.",
      rating: 5
    },
    {
      name: "Emily R.",
      review: "The cross-platform sync is a game-changer. I can access my notes on all my devices seamlessly.",
      rating: 5
    },
    {
      name: "David L.",
      review: "Great app, but I wish it had more customization options for the interface.",
      rating: 4
    },
    {
      name: "Lisa K.",
      review: "NoteMaster's collaboration features have made team projects so much easier to manage.",
      rating: 5
    },
    {
      name: "Alex W.",
      review: "The search functionality is incredibly fast and accurate. Saves me a lot of time!",
      rating: 5
    },
    {
      name: "Olivia P.",
      review: "I love how intuitive the user interface is. It made transitioning from my old note-taking app a breeze.",
      rating: 4
    }
  ];

  function getColumnPosition(index: number) {
    return (index % 4) * 24 + 6;
  }

  function getRowPosition(index: number) {
    return Math.floor(index / 4) * 200 + 100;
  }
</script>

<section class="py-16 mt-20 px-4 sm:px-6 lg:px-8 relative">
  <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center relative z-10">
    <span>User </span>
    <span class="relative inline-block px-2">
      <span class="relative z-10">Reviews</span>
      <span class="absolute inset-0 bg-purple-200 transform -skew-x-6 rounded-lg"></span>
    </span>
  </h2>
  <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each reviews as review, index}
      <div class="bg-white p-4 rounded-lg shadow-md transition-all duration-300 mt-5" style="transform: rotate({Math.random() * 6 - 3}deg);">
        <div class="flex items-center mb-2">
          <div class="text-yellow-400">
            {#each Array(5) as _, i}
              {#if i < review.rating}
                <span class="text-yellow-400">★</span>
              {:else}
                <span class="text-gray-300">★</span>
              {/if}
            {/each}
          </div>
          <span class="ml-2 text-sm text-gray-600">{review.rating}/5</span>
        </div>
        <p class="text-sm text-gray-600 mb-2">{review.review}</p>
        <p class="text-xs font-semibold text-gray-900">{review.name}</p>
      </div>
    {/each}
  </div>
</section>
