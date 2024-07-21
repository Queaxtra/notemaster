<script>
    import db from "$lib/db";

    let isValid = db.authStore?.isValid;
</script>

<section class="py-8 sm:py-12 md:py-16 mt-10 sm:mt-16 md:mt-20">
  <div class="container mx-auto px-4 max-w-6xl text-center">
    <div class="relative inline-block">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 relative z-10">
        NoteMaster
      </h1>
      <div class="opacity-30 hidden sm:block">
        <span class="absolute -top-2 sm:-top-4 -left-3 sm:-left-6 text-2xl sm:text-3xl transform -rotate-12">📝</span>
        <span class="absolute -top-1 sm:-top-2 right-0 text-3xl sm:text-4xl">💡</span>
        <span class="absolute bottom-0 -left-2 sm:-left-4 text-2xl sm:text-3xl transform rotate-12">✨</span>
        <span class="absolute -bottom-2 sm:-bottom-4 right-2 sm:right-4 text-2xl sm:text-3xl">🚀</span>
        <span class="absolute top-1/2 -right-4 sm:-right-8 text-3xl sm:text-4xl transform rotate-45">🎯</span>
      </div>
    </div>
    <p class="text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-6 md:mb-8">
      Organize Your Thoughts, Make Your Life Easier
    </p>
    <a href={isValid ? "/notes" : "/login"} class="inline-block py-2 px-4 sm:px-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300 text-sm">
      {#if isValid}
        View Notes
      {:else}
        Get Started
      {/if}
    </a>
  </div>
</section>
