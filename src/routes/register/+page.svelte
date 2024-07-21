<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createUser } from '$lib/user';
  import toast, { Toaster } from 'svelte-french-toast';
  import db from '$lib/db';

  let user = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    emailVisibility: true,
    subscriptionPlan: "Free"
  }

  let isValid = db.authStore?.isValid;
  let isSubmitting = false;

  onMount(() => {
    if (isValid) {
      goto('/notes');
    }
  });

  async function handleRegister() {
    isSubmitting = true;
    try {
      await createUser(user.name, user.username, user.password, user.passwordConfirm, user.email, user.emailVisibility, user.subscriptionPlan).then((user) => {
        if (user) {
          toast.success('Account created successfully!', {
            duration: 3000,
            position: 'top-center',
          });
          setTimeout(() => {
            goto('/login');
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while creating the account.', {
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
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" bind:value={user.name} required class="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" bind:value={user.username} required class="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" bind:value={user.email} required class="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" bind:value={user.password} required class="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div>
        <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" id="passwordConfirm" bind:value={user.passwordConfirm} required class="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="emailVisibility" bind:checked={user.emailVisibility} class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
        <label for="emailVisibility" class="ml-2 block text-sm text-gray-700">Make email visible to other users</label>
      </div>
      <div>
        <button type="submit" disabled={isSubmitting} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {#if isSubmitting}
            Wait...
          {:else}
            Register
          {/if}
        </button>
      </div>
    </form>
    <p class="mt-6 text-center text-sm text-gray-600">Already have an account? <a href="/login" class="font-medium text-orange-400 hover:text-orange-500 transition-colors duration-300">Log In</a></p>
  </div>
</section>
