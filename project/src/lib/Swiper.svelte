<script>
    import Swiper from "swiper";
    import {
        Navigation,
        Pagination,
        Scrollbar,
        Autoplay,
        EffectCoverflow,
    } from "swiper/modules";
    import ProjectCard from "./ProjectCardItem.svelte";

    export let projects = [];

    function swiper(node) {
        let swiper = new Swiper(node, {
            effect: "coverflow",
            modules: [
                Navigation,
                Pagination,
                Scrollbar,
                Autoplay,
                EffectCoverflow,
            ],
            loop: true,
            slidesPerView: 3,
            autoplay: {
                delay: 2500,
            },
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
        });

        return {
            destroy() {
                swiper.destroy();
            },
        };
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
</svelte:head>

<div class="swiper" use:swiper>
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        {#each projects as project}
            <div class="swiper-slide">
                <ProjectCard
                    image={project.image}
                    name={project.name}
                    description={project.stack.join(", ")}
                    platforms={project.platforms}
                />
            </div>
        {/each}
    </div>
    <!-- If we need pagination -->

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
</div>

<style>
    .swiper {
        width: 100%;
        height: 380px;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
