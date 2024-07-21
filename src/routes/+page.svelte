<script>
    import { fade } from "svelte/transition";
    import Navbar from "../components/Navbar.svelte";
    import Header from "../components/Header.svelte";
    import Why from "../components/Why.svelte";
    import Faq from "../components/Faq.svelte";
    import Reviews from "../components/Reviews.svelte";
    import Footer from "../components/Footer.svelte";
    import Pricing from "../components/Pricing.svelte";
</script>

<div in:fade={{ duration: 300 }}>
    <Navbar />
    <Header />
    <Why />
    <Faq />
    <Reviews />
    <Pricing />
    <Footer />
</div>