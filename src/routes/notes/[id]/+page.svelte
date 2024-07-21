<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import db from '$lib/db';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { updateNote } from '$lib/note';
    import toast, { Toaster } from 'svelte-french-toast';

    let note: any = null;
    let loading = true;
    let error: string | null = null;
    let isMenuOpen = false;
    let isEditModalOpen = false;
    let shareLink: string | null = null;
    let edited = {
        title: '',
        content: '',
        category: '',
        visibility: false
    };

    const categories = [
        "Personal", "Work", "Study", "Ideas", "Other", "Travel", "Health", "Finance",
        "Sports", "Food", "Music", "Movies", "Books", "Gaming", "Tech", "Art", "Fashion"
    ];
    
    onMount(async () => {
        const noteId = $page.params.id;
        try {
            note = await db.collection('notes').getOne(noteId);
            edited = {
                title: note.title,
                content: note.content,
                category: note.category || categories[0],
                visibility: note.visibility || false
            };
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

    function openEditModal() {
        isEditModalOpen = true;
        edited = {
            title: note.title,
            content: note.content,
            category: note.category || categories[0],
            visibility: note.visibility || false
        };
    }

    function closeEditModal() {
        isEditModalOpen = false;
    }

    async function handleSave() {
        if (!note) return;
        try {
            await updateNote(note.id, edited.title, edited.content, edited.visibility, edited.category);
            note = {
                ...note,
                ...edited
            };
            closeEditModal();
        } catch (err) {
            console.error('Error updating note:', err);
            error = 'Failed to update note';
        }
    }

    function generateShareLink() {
        if (note && note.visibility) {
            shareLink = `${window.location.origin}/share/${note.id}`;
        }
    }
</script>

<Toaster />
<div class="flex flex-col h-screen" in:fade={{ duration: 300 }}>
    {#if loading}
        <div class="flex-grow flex items-center justify-center">
            <p class="text-xl">Loading...</p>
        </div>
    {:else if error}
        <div class="flex-grow flex items-center justify-center">
            <p class="text-xl text-red-500">{error}</p>
        </div>
    {:else if note}
        <main class="flex-grow p-4 overflow-auto">
            <h1 class="text-3xl font-extrabold mb-4">{note.title}</h1>
            <hr class="mb-4" />
            <p class="mb-8 whitespace-pre-wrap">{@html note.content}</p>
        </main>
        <nav class="bg-white border border-b shadow-lg p-4 text-xs">
            <div class="flex justify-between items-center">
                <div class="hidden sm:flex items-center">
                    <button on:click={() => goto('/notes')} class="inline-block py-2 px-4 sm:px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-300 mr-2">
                        Back to Notes
                    </button>
                    <button on:click={openEditModal} class="inline-block py-2 px-4 sm:px-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300 mr-2">
                        Edit Note
                    </button>
                    {#if note.visibility}
                        <button on:click={generateShareLink} class="inline-block py-2 px-4 sm:px-6 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors duration-300">
                            Share
                        </button>
                    {/if}
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
                            <button on:click={openEditModal} class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Edit Note
                            </button>
                            {#if note.visibility}
                                <button on:click={generateShareLink} class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Share
                                </button>
                            {/if}
                        </div>
                    {/if}
                </div>
                <div class="text-right">
                    <p class="text-gray-600">Created: {formatDate(note.created)}</p>
                    <p class="text-gray-600">Category: {note.category || 'No category'}</p>
                    <p class="text-gray-600">Visibility: {note.visibility ? 'Public' : 'Private'}</p>
                </div>
            </div>
        </nav>
    {/if}
</div>

{#if isEditModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-80 md:w-96 lg:w-1/3 max-w-lg relative">
            <button on:click={closeEditModal} class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <i class="ri-close-line text-xl"></i>
            </button>
            <h2 class="text-2xl font-bold mb-4">Edit Note</h2>
            <input  bind:value={edited.title} class="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="Title" />
            <textarea bind:value={edited.content} class="w-full p-2 mb-4 border rounded-lg h-40 focus:outline-none focus:ring-orange-500 focus:border-orange-500"placeholder="Content"></textarea>
            <select bind:value={edited.category} class="w-full p-2 mb-4 border rounded-lg">
                {#each categories as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
            <label class="flex items-center mb-4">
                <input type="checkbox" bind:checked={edited.visibility} class="mr-2" />
                Public Note
            </label>
            <div class="flex justify-end text-sm">
                <button on:click={handleSave} class="inline-block py-2 px-4 sm:px-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300">Save</button>
            </div>
        </div>
    </div>
{/if}

{#if shareLink}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-80 md:w-96 lg:w-1/3 max-w-lg relative">
            <button on:click={() => shareLink = null} class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <i class="ri-close-line text-xl"></i>
            </button>
            <h2 class="text-2xl font-bold mb-4">Share Link</h2>
            <input type="text" readonly value={shareLink} class="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
            <div class="flex justify-end text-sm">
                <button on:click={() => { shareLink && navigator.clipboard.writeText(shareLink); toast.success('Link copied to clipboard!'); }} class="inline-block py-2 px-4 sm:px-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300 mr-2">
                    Copy Link
                </button>
                <button on:click={() => { shareLink && window.open(shareLink, '_blank'); }} class="inline-block py-2 px-4 sm:px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-300">
                    View Link
                </button>
            </div>
        </div>
    </div>
{/if}
