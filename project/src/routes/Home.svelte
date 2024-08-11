<script>
    import computerGuy from "../assets/computerGuy.jpeg";
    import { projects, skils } from "../data/data";
    import ProjectsCarousel from "../lib/ProjectsCarousel.svelte";
    import Swiper from "../lib/Swiper.svelte";

    import gmail from "../assets/gmail.svg";
    import telegram from "../assets/telegram.svg";
    import octocat from "../assets/octocat.svg";
    import linkedin from "../assets/linkedin.svg";
    import ProjectCard from "../lib/ProjectCard.svelte";
</script>

<main class="px-8">
    <!-- About Me -->
    <div class="grid grid-cols-3 mt-8" id="about">
        <div class="col-span-3 md:col-span-2 text-left flex items-center">
            <div>
                <h2 class="text-bold">
                    <span class="me-text">About</span> Me
                </h2>

                <p class="mt-2 text-lg font-medium">
                    Hi, I'm Taalay, a passionate software engineer with a knack
                    for crafting clean, efficient, and user-friendly solutions.
                </p>

                <p class="mt-1 text-sm">
                    I'm a self-taught developer with a strong foundation in
                    mobile and web technologies. I specialize in building
                    high-quality, scalable applications that deliver exceptional
                    user experiences.
                </p>

                <div class="flex flex-wrap gap-4 items-center mt-3">
                    <a
                        href="mailto: a.u.taalay@gmail.com"
                        class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
                    >
                        <img src={gmail} alt="gmail" />
                    </a>
                    <a
                        href="https://web.telegram.org/k/#@taalay_dev"
                        class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
                    >
                        <img src={telegram} alt="telegram" />
                    </a>
                    <a
                        href="https://github.com/TaalayDev"
                        class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
                    >
                        <img src={octocat} alt="github" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/taalaydev/"
                        class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
                    >
                        <img src={linkedin} alt="linkedin" />
                    </a>
                </div>
            </div>
        </div>
        <div
            class="col-span-3 md:col-span-1 md:mt-0 mt-3 flex items-center justify-center"
        >
            <img src={computerGuy} alt="" style="max-height: 250px;" />
        </div>
    </div>
    <!-- About Me End -->

    <!-- Experience And Skills -->
    <div class="grid grid-cols-2 mt-8">
        <div class="col-span-2 md:col-span-1 text-left">
            <span class="text-lg">Experience</span>
            <p class="text-sm mt-2">
                Over the years I've gained valuable experience through
                freelancing and collaborations with diverse teams, startups, and
                organizations. Here's a snapshot of my journey:
            </p>
            <div class="mt-3">
                Freelancing
                <p class="text-sm">Android Developer, Web Development</p>
                <p style="font-size: 12px;">2018 - 2019</p>
            </div>
            <div class="mt-3">
                One-Team company
                <p class="text-sm">Android Developer, Cofounder</p>
                <p style="font-size: 12px;">2019 - 2021</p>
            </div>
            <div class="mt-3">
                Oracle Digital
                <p class="text-sm">Flutter Developer (Remotely Contract)</p>
                <p style="font-size: 12px;">2021 - 2022</p>
            </div>
            <div class="mt-3">
                ItAdis
                <p class="text-sm">Lead Flutter and Android Developer</p>
                <p style="font-size: 12px;">2022 January - 2022 September</p>
            </div>

            <div class="mt-3">
                Oracle Digital
                <p class="text-sm">Lead Flutter and Android Developer</p>
                <p style="font-size: 12px;">2022 September - 2024 February</p>
            </div>

            <div class="mt-3">
                Peacky Group
                <p class="text-sm">Android Developer</p>
                <p style="font-size: 12px;">2024 March - 2024 May</p>
            </div>

            <div class="mt-3">
                Peacky Group
                <p class="text-sm">iOS Developer</p>
                <p style="font-size: 12px;">2024 May - Present</p>
            </div>
        </div>

        <div class="col-span-2 md:col-span-1 text-left md:mt-0 mt-3">
            <span class="text-lg">My skils</span>
            <p class="text-sm mt-2 gap-2">
                {#each skils as skil}
                    <div class="mt-3">
                        <span>
                            {skil.name}:
                            {#each skil.langs as lang}
                                <span
                                    class="px-2 bg-gray-100 ml-2"
                                    style="border-radius: 40px; padding: 1px 8px 1px 8px;"
                                >
                                    {lang}
                                </span>
                            {/each}
                        </span>
                        <div>
                            <div
                                class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-4"
                            >
                                <div style="width: {skil.percent}%;">
                                    <div
                                        class="bg-blue-600 h-2.5 rounded-full skill-progress"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </p>
        </div>
    </div>
    <!-- Experience And Skills End -->

    <!-- Projects -->
    <div class="mt-14 text-left" id="projects">
        <h2 style="font-size: 25px;" class="font-normal mb-8">
            Last Projects I worked on
        </h2>
        <div class="">
            <Swiper {projects} />
        </div>
    </div>

    <!-- Projects End -->

    <div class="h-16" />
</main>

<style>
    .me-text {
        color: #50afc0;
        font-weight: 700;
    }

    .contact-icon {
        padding: 10px;
        border: 1px solid rgb(120, 119, 119);
        transition: 0.3s;
    }

    .contact-icon:hover {
        transform: scale(1.1);
    }

    h2 {
        font-size: 30px;
    }

    .skill-progress {
        transition: 0.3s;
        animation: progress 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
    }

    @media (prefers-color-scheme: dark) {
        .skill-progress {
            background-color: #50afc0;
        }
    }

    @keyframes progress {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }
</style>
