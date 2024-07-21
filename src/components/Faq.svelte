<script lang="ts">
  import { slide } from 'svelte/transition';

  const faqs = [
    {
      question: "What is NoteMaster?",
      answer: "NoteMaster is a modern web application developed for note-taking and organization."
    },
    {
      question: "How can I use NoteMaster?",
      answer: "You can start using NoteMaster immediately by signing up on our website. Thanks to its simple and user-friendly interface, you can easily create and edit notes."
    },
    {
      question: "Is NoteMaster paid?",
      answer: "NoteMaster has both free and premium versions. The premium version offers more features and storage space."
    },
    {
      question: "Can I access my notes offline?",
      answer: "Yes, NoteMaster offers offline access to your notes. You can view and edit your notes even without an internet connection, and they will sync once you're back online."
    },
    {
      question: "Is my data secure with NoteMaster?",
      answer: "Absolutely. We use industry-standard encryption to protect your data. Your notes are private and can only be accessed by you."
    },
    {
      question: "Can I collaborate with others on NoteMaster?",
      answer: "Yes, our premium version allows you to share notes and collaborate with team members in real-time."
    },
    {
      question: "What devices can I use NoteMaster on?",
      answer: "NoteMaster is available on web browsers, iOS, and Android devices. Your notes sync across all your devices automatically."
    }
  ];

  let activeIndex: number | null = null;

  function toggleQuestion(index: number | null) {
    activeIndex = activeIndex === index ? null : index;
  }
</script>

<section class="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 mt-20">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 relative inline-block">
      <span class="relative inline-block px-2 py-1 bg-yellow-200 rounded-lg">
        <span class="relative z-10">Frequently Asked Questions</span>
        <span class="absolute inset-0 bg-yellow-200 transform -skew-x-6 rounded-lg"></span>
      </span>
    </h2>
    <dl class="space-y-4 sm:space-y-6">
      {#each faqs as faq, index}
        <div class="border-b border-gray-200 pb-4 sm:pb-6">
          <dt class="text-base sm:text-lg">
            <button on:click={() => toggleQuestion(index)} class="flex justify-between items-start text-left w-full font-semibold text-gray-900 focus:outline-none">
              <span class="pr-6">{faq.question}</span>
              <span class="ml-2 flex-shrink-0 transition-transform duration-300 ease-in-out {activeIndex === index ? 'rotate-180' : ''}">
                <i class="ri-arrow-down-s-line text-xl sm:text-2xl"></i>
              </span>
            </button>
          </dt>
          {#if activeIndex === index}
            <dd class="mt-2 pr-4 sm:pr-12" transition:slide>
              <p class="text-sm sm:text-base text-gray-600">{faq.answer}</p>
            </dd>
          {/if}
        </div>
      {/each}
    </dl>
  </div>
</section>
