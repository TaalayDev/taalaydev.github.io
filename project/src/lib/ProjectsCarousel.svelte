<script>
    import ScrollCarousel from "scroll-carousel";
    import { onMount } from "svelte";
    import ProjectCardItem from "./ProjectCardItem.svelte";

    let carousel;

    export let projects = [];

    onMount(() => {
        carousel = new ScrollCarousel(".my-carousel", {
            speed: 3,
            autoplay: true,
            autoplaySpeed: 5,
            smartSpeed: true,
            direction: "rtl",
            margin: 20,
        });
    });
</script>

<div class="my-carousel">
    {#each projects as project}
        <ProjectCardItem
            image={project.image}
            name={project.name}
            description={project.stack.join(", ")}
            platforms={project.platforms}
        />
    {/each}
</div>
