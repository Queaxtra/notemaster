<script lang="ts">
    import { fade } from "svelte/transition";
    import { createNote } from "$lib/note";
    import db from "$lib/db";
    import { goto } from "$app/navigation";
    import toast, { Toaster } from 'svelte-french-toast';

    let username = db.authStore?.model?.username || '';
    let isSubmitting = false;

    let note = {
        title: "",
        content: "",
        author: username,
        visibility: false,
        category: "",
    }

    let categories = [
        "Personal", "Work", "Study", "Ideas", "Other", "Travel", "Health", "Finance",
        "Sports", "Food", "Music", "Movies", "Books", "Gaming", "Tech", "Art", "Fashion"
    ];

    $: isFormValid = note.title.trim() !== '' && 
                     note.content.trim() !== '' && 
                     note.category !== '';

    async function handleCreate() {
        if (!isFormValid) return;

        isSubmitting = true;
        try {
            const createdNote = await createNote(note.title, note.content, note.author, note.visibility, note.category);
            if (createdNote) {
                toast.success('Note created successfully!', {
                    duration: 3000,
                    position: 'top-center',
                });
                setTimeout(() => {
                    goto('/notes');
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while creating the note.', {
                duration: 3000,
                position: 'top-center',
            });
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Toaster />

<div class="flex flex-col h-screen" in:fade={{ duration: 300 }}>
    <main class="flex-grow p-4 overflow-auto">
        <h1 class="text-3xl font-bold mb-6">Create New Note</h1>
        <form on:submit|preventDefault={handleCreate} class="space-y-4">
            <div>
                <label for="title" class="block text-sm font-medium">Title</label>
                <input type="text" id="title" bind:value={note.title} required class="mt-1 py-1.5 block w-full rounded-lg border px-2" />
            </div>
            <div>
                <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                <textarea id="content" bind:value={note.content} required rows="10" class="mt-1 block w-full rounded-lg border px-2"></textarea>
            </div>
            <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <select id="category" bind:value={note.category} required class="mt-1 block w-full rounded-lg border py-1.5 px-2">
                    <option value="">Select a category</option>
                    {#each categories as category}
                        <option value={category}>{category}</option>
                    {/each}
                </select>
            </div>
            <div class="flex items-center">
                <input type="checkbox" id="visibility" bind:checked={note.visibility} class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <label for="visibility" class="ml-2 block text-sm text-gray-900">Make note public</label>
            </div>
        </form>
    </main>
    <nav class="bg-white border border-b shadow-lg p-4 text-xs">
        <div class="flex justify-between items-center">
            <button on:click={() => goto('/notes')} class="inline-block py-2 px-4 sm:px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-300 mr-2">
                Back to Notes
            </button>
            <button on:click={handleCreate} disabled={isSubmitting || !isFormValid} class="inline-block py-2 px-4 sm:px-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Creating...' : 'Create Note'}
            </button>
        </div>
    </nav>
</div>
