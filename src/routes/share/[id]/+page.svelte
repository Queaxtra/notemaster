<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import db from '$lib/db';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

    let note: any = null;
    let loading = true;
    let error: string | null = null;
    let isMenuOpen = false;

    onMount(async () => {
        const noteId = $page.params.id;
        try {
            note = await db.collection('notes').getOne(noteId);
            if (!note.visibility) {
                error = 'This note is not publicly available.';
            }
            loading = false;
        } catch (err) {
            console.error('Error fetching note:', err);
            error = 'Failed to load note';
            loading = false;
        }
    });

    function formatDate(date: string | number | Date) {
        return new Date(date).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<div class="flex flex-col h-screen" in:fade={{ duration: 300 }}>
    {#if loading}
        <div class="flex-grow flex items-center justify-center">
            <p class="text-xl">Loading...</p>
        </div>
    {:else if error}
        <div class="flex-grow flex items-center justify-center">
            <p class="text-xl text-red-500">{error}</p>
        </div>
    {:else if note && note.visibility}
        <main class="flex-grow p-4 overflow-auto">
            <h1 class="text-3xl font-extrabold mb-4">{note.title}</h1>
            <hr class="mb-4" />
            <p class="mb-8 whitespace-pre-wrap">{@html note.content}</p>
        </main>
        <nav class="bg-white border-t shadow-lg p-4 text-xs">
            <div class="flex justify-between items-center">
                <div class="hidden sm:flex items-center">
                    <button on:click={() => goto('/notes')} class="inline-block py-2 px-4 sm:px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-300 mr-2">
                        Back to Notes
                    </button>
                </div>
                <div class="sm:hidden relative">
                    <button on:click={toggleMenu} class="inline-block py-2 px-4 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300">
                        Menu
                    </button>
                    {#if isMenuOpen}
                        <div class="absolute bottom-full left-0 mb-2 w-48 bg-white border rounded-lg shadow-lg">
                            <button on:click={() => goto('/notes')} class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Back to Notes
                            </button>
                        </div>
                    {/if}
                </div>
                <div class="text-right">
                    <p class="text-gray-600">Created: {formatDate(note.created)}</p>
                    <p class="text-gray-600">Category: {note.category || 'No category'}</p>
                    <p class="text-gray-600">Author: {note.author || 'Anonymous'}</p>
                </div>
            </div>
        </nav>
    {:else}
        <div class="flex-grow flex items-center justify-center">
            <p class="text-xl text-red-500">This note is not publicly available.</p>
        </div>
    {/if}
</div>
