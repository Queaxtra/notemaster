<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { logoutUser } from '$lib/user';
  import db from '$lib/db';
  import Navbar from '../../components/Navbar.svelte';
  import Footer from '../../components/Footer.svelte';

  let user = {
    name: db.authStore?.model?.name || '',
    username: db.authStore?.model?.username || '',
    email: db.authStore?.model?.email || '',
    joinDate: db.authStore?.model?.created || '',
    profileImage: db.authStore?.model?.profileImage || 'https://www.upload.ee/image/16882966/no-user.png',
  };

  let isValid = db.authStore?.isValid;

  onMount(() => {
    if (!isValid) {
      goto('/login');
    }
  });

  async function handleLogout() {
    await logoutUser();
    goto('/login');
  }
</script>

<Navbar />
<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" in:fade={{ duration: 300 }}>
  <div class="max-w-3xl w-full mx-auto rounded-lg shadow-md overflow-hidden border">
    <div class="px-4 py-5 sm:px-6 bg-orange-200">
      <h1 class="text-2xl font-extrabold text-orange-500">User Profile</h1>
    </div>
    <div class="px-4 py-5 sm:p-6 bg-white">
      <div class="flex items-center space-x-4 mb-6">
        <img src={user.profileImage} alt="Profile" class="w-20 h-20 rounded-full" />
        <div>
          <h2 class="text-xl font-extrabold">{user.name}</h2>
          <p>{user.username}</p>
          <p class="text-xs">{user.email}</p>
        </div>
      </div>
      <p class="text-xs mb-2">Joined: {user.joinDate}</p>
      <div class="flex space-x-2">
        <button on:click={() => goto('/notes')} class="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out text-sm">
          View Notes
        </button>
        <button on:click={handleLogout} class="flex-1 bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out text-sm">
          Logout
        </button>
      </div>
    </div>
  </div>
</div>

<Footer />