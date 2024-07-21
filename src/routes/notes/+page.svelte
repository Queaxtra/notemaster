<script lang="ts">
    import { onMount } from 'svelte';
    import db from '$lib/db';
    import { goto } from '$app/navigation';
    import Navbar from '../../components/Navbar.svelte';
    import Footer from '../../components/Footer.svelte';
    import { deleteNote } from '$lib/note';

    let username = db.authStore?.model?.username || '';
    let notes: any[] = [];
    let filteredNotes: any[] = [];
    let loading = true;
    let showConfirmModal = false;
    let noteToDelete: any = null;
    let search = '';

    const noteStyles = [
        { bgColor: 'bg-pink-100', borderColor: 'border-pink-300', buttonColor: 'bg-pink-400 hover:bg-pink-500' },
        { bgColor: 'bg-purple-100', borderColor: 'border-purple-300', buttonColor: 'bg-purple-400 hover:bg-purple-500' },
        { bgColor: 'bg-indigo-100', borderColor: 'border-indigo-300', buttonColor: 'bg-indigo-400 hover:bg-indigo-500' },
        { bgColor: 'bg-blue-100', borderColor: 'border-blue-300', buttonColor: 'bg-blue-400 hover:bg-blue-500' },
        { bgColor: 'bg-green-100', borderColor: 'border-green-300', buttonColor: 'bg-green-400 hover:bg-green-500' },
        { bgColor: 'bg-yellow-100', borderColor: 'border-yellow-300', buttonColor: 'bg-yellow-400 hover:bg-yellow-500' },
        { bgColor: 'bg-red-100', borderColor: 'border-red-300', buttonColor: 'bg-red-400 hover:bg-red-500' },
        { bgColor: 'bg-orange-100', borderColor: 'border-orange-300', buttonColor: 'bg-orange-400 hover:bg-orange-500' },
        { bgColor: 'bg-teal-100', borderColor: 'border-teal-300', buttonColor: 'bg-teal-400 hover:bg-teal-500' },
        { bgColor: 'bg-cyan-100', borderColor: 'border-cyan-300', buttonColor: 'bg-cyan-400 hover:bg-cyan-500' }
    ];

    onMount(async () => {
        try {
            const records = await db.collection('notes').getList(1, 50, {
                sort: '-created',
                filter: `author = "${username}"`,
            });
            notes = records.items;
            filteredNotes = notes;
            loading = false;
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    });

    function formatDate(date: string | number | Date) {
        return new Date(date).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    function getRandomStyle() {
        return noteStyles[Math.floor(Math.random() * noteStyles.length)];
    }

    function confirmDelete(note: any) {
        noteToDelete = note;
        showConfirmModal = true;
    }

    async function handleDelete() {
        if (noteToDelete) {
            try {
                await deleteNote(noteToDelete.id);
                notes = notes.filter(note => note.id !== noteToDelete.id);
                filteredNotes = filteredNotes.filter(note => note.id !== noteToDelete.id); // Update filtered notes
                showConfirmModal = false;
                noteToDelete = null;
            } catch (err) {
                console.error('Error deleting note:', err);
            }
        }
    }

    function searchNotes() {
        if (search) {
            filteredNotes = notes.filter(note => 
                note.title.toLowerCase().includes(search.toLowerCase()) || 
                note.content.toLowerCase().includes(search.toLowerCase())
            );
        } else {
            filteredNotes = notes;
        }
    }
</script>

{#if loading}
<div class="flex items-center justify-center min-h-screen">
    <p class="text-xl">Loading...</p>
</div>
{:else if notes}
<Navbar />
<div class="container mx-auto px-4 py-8 flex flex-col items-center">
    <div class="relative inline-block">
        <h1 class="text-3xl font-extrabold mb-2 sm:mb-4 relative z-10">
            All Notes
        </h1>
        <div class="opacity-30 hidden sm:block">
            <span class="absolute -top-2 sm:-top-4 -left-3 sm:-left-6 text-2xl sm:text-3xl transform -rotate-12">📝</span>
            <span class="absolute -top-1 sm:-top-2 right-0 text-3xl sm:text-4xl">💡</span>
            <span class="absolute bottom-0 -left-2 sm:-left-4 text-2xl sm:text-3xl transform rotate-12">✨</span>
            <span class="absolute -bottom-2 sm:-bottom-4 right-2 sm:right-4 text-2xl sm:text-3xl">🚀</span>
            <span class="absolute top-1/2 -right-4 sm:-right-8 text-3xl sm:text-4xl transform rotate-45">🎯</span>
        </div>
    </div>
    
    {#if filteredNotes.length === 0}
        <p class="text-center mt-5 mb-5">No notes found.</p>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mb-5">
            {#each filteredNotes as note}
                {@const style = getRandomStyle()}
                <div class="{style.bgColor} border-2 {style.borderColor} shadow-lg rounded-lg p-4 h-full flex flex-col transition-all duration-300 w-80">
                    <h2 class="text-xl font-semibold mb-2 text-center break-words">{note.title}</h2>
                    <div class="text-gray-600 mb-4 flex-grow overflow-auto break-words">
                        {#if note.content.length > 200}
                            {@html note.content.slice(0, 200)}...
                        {:else}
                            {@html note.content}
                        {/if}
                    </div>
                    <hr class="mb-4 border-t {style.borderColor}" />
                    <div class="flex flex-col text-xs opacity-50">
                        <span class="mb-1">{formatDate(note.created)}</span>
                        <span class="mb-1">Category: {note.category || 'No category'}</span>
                    </div>
                    <div class="flex justify-between mt-2">
                        <button on:click={() => goto(`/notes/${note.id}`)} class="inline-block py-2 px-4 {style.buttonColor} text-white font-semibold rounded-lg transition-colors duration-300 text-sm">
                            View Note
                        </button>
                        <button on:click={() => confirmDelete(note)} class="inline-block py-2 px-4 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors duration-300 text-sm">
                            Delete Note
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    <div class="flex mt-4 mb-5">
        <button on:click={() => goto('/create')} class="inline-block py-2 px-4 sm:px-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors duration-300 text-sm mr-2">
            Create Note
        </button>
        <button on:click={() => goto('/')} class="inline-block py-2 px-4 sm:px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-300 text-sm ml-2">
            Back to Home
        </button>
    </div>
    <input type="text" placeholder="Search notes..." bind:value={search} on:input={searchNotes} class="border rounded-lg p-2 mb-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
</div>
<Footer />
{/if}

{#if showConfirmModal}
<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="bg-white p-5 rounded-lg shadow-xl">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-4">Are you sure you want to delete this note?</p>
        <div class="flex justify-end">
            <button on:click={() => showConfirmModal = false} class="inline-block py-2 px-4 sm:px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-300 text-sm mr-2">
                Cancel
            </button>
            <button on:click={handleDelete} class="inline-block py-2 px-4 sm:px-6 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors duration-300 text-sm">
                Confirm
            </button>
        </div>
    </div>
</div>
{/if}
