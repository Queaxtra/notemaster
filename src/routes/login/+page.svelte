<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { loginUser } from '$lib/user';
  import toast, { Toaster } from 'svelte-french-toast';
  import db from '$lib/db';

  let user = {
    username: "",
    password: ""
  }

  let isValid = db.authStore?.isValid;
  let isSubmitting = false;

  onMount(() => {
    if (isValid) {
      goto('/notes');
    }
  });

  async function handleLogin() {
    isSubmitting = true;
    try {
      const loggedInUser = await loginUser(user.username, user.password);
      if (loggedInUser) {
        toast.success('Login successful!', {
          duration: 3000,
          position: 'top-center',
        });
        setTimeout(() => {
          goto('/notes');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Login failed. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      isSubmitting = false;
    }
  }
</script>

<Toaster />
<section class="flex items-center justify-center min-h-screen px-4" in:fade={{ duration: 300 }}>
  <div class="max-w-md w-full border bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Log In</h2>
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" bind:value={user.username} required class="mt-1 block w-full px-2 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" bind:value={user.password} required class="mt-1 block w-full px-2 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div>
        <button type="submit" disabled={isSubmitting} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {#if isSubmitting}
            Wait...
          {:else}
            Log In
          {/if}
        </button>
      </div>
    </form>
    <p class="mt-6 text-center text-sm text-gray-600">Don't have an account? <a href="/register" class="font-medium text-orange-400 hover:text-orange-500 transition-colors duration-300">Register</a></p>
  </div>
</section>
