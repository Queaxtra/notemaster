<script>
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  function goHome() {
    goto('/');
  }
</script>

<section class="flex items-center justify-center min-h-screen px-4" in:fade={{ duration: 300 }}>
  <div class="text-center">
    <h1 class="text-6xl sm:text-8xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-2xl sm:text-3xl font-semibold text-gray-600 mb-6">Oops! Page Not Found</p>
    <p class="text-lg text-gray-500 mb-8">The page you're looking for doesn't exist or may have been moved.</p>
    <div class="space-y-4 sm:space-y-0 sm:space-x-4">
      <button on:click={goHome} class="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 text-sm">Return to Home</button>
      <a href="/contact" class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors duration-300 text-sm">Contact Us</a>
    </div>
  </div>
</section>
