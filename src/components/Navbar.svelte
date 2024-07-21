<script lang="ts">
  import { fly } from 'svelte/transition';
  import db from '$lib/db';

  let isValid = db.authStore?.isValid;
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<nav class="p-4 relative text-sm">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-xl font-bold flex items-center">
      <i class="ri-sticky-note-line mr-2"></i>
      NoteMaster
    </a>

    {#if isValid === true}
    <div class="hidden md:flex space-x-4">
      <a href="/">
        <i class="ri-home-line mr-1"></i> Home
      </a>
      <a href="/notes">
        <i class="ri-file-list-line mr-1"></i> Notes
      </a>
      <a href="/create">
        <i class="ri-add-line mr-1"></i> Create
      </a>
      <a href="/profile">
        <i class="ri-user-line mr-1"></i> Profile
      </a>
    </div>
    {:else}
    <div class="hidden md:flex space-x-4">
      <a href="/">
        <i class="ri-home-line mr-1"></i> Home
      </a>
      <a href="/login">
        <i class="ri-user-line mr-1"></i> Login
      </a>
    </div>
    {/if}

    <button class="md:hidden text-black" on:click={toggleMenu}>
      <i class="ri-menu-line text-xl"></i>
    </button>
  </div>

  {#if isOpen}
    <button class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={toggleMenu} aria-label="Toggle Menu"></button>
    <div class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-4" transition:fly={{ x: 300, opacity: 1, duration: 300 }}>
      <button class="absolute top-4 right-4 text-black" on:click={toggleMenu}>
        <i class="ri-close-line text-2xl"></i>
      </button>
      <div class="flex flex-col space-y-4 mt-12">
        {#if isValid === true}
        <a href="/">
          <i class="ri-home-line mr-1"></i> Home
        </a>
        <a href="/notes">
          <i class="ri-file-list-line mr-1"></i> Notes
        </a>
        <a href="/create">
          <i class="ri-add-line mr-1"></i> Create
        </a>
        <a href="/profile">
          <i class="ri-user-line mr-1"></i> Profile
        </a>
        {:else}
        <a href="/">
          <i class="ri-home-line mr-1"></i> Home
        </a>
        <a href="/login">
          <i class="ri-user-line mr-1"></i> Login
        </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>
