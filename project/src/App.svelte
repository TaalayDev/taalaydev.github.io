<script lang="ts">
  import Navbar from "./lib/Navbar.svelte";
  import Carousel from "./lib/Carousel.svelte";
  import computerGuy from "./assets/computerGuy.jpeg";
  import ProjectCard from "./lib/ProjectCard.svelte";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import SiGmail from "svelte-icons-pack/si/SiGmail";
  import SiTelegram from "svelte-icons-pack/si/SiTelegram";
  import ImGithub from "svelte-icons-pack/im/ImGithub";
  import SiLinkedin from "svelte-icons-pack/si/SiLinkedin";
  import { projects, skils } from "./data/data";

  let innerWidth = 0;
  $: perPage = innerWidth <= 480 ? 1 : innerWidth <= 768 ? 1 : 3;
</script>

<svelte:window bind:innerWidth />

<Navbar />

<main class="px-8">
  <!-- About Me -->
  <div class="grid grid-cols-3 mt-8" id="about">
    <div class="col-span-3 md:col-span-2 text-left flex items-center">
      <div>
        <h1 class="text-bold">
          About <span class="me-text">Me</span>
        </h1>
        <p class="mt-2 text-lg font-medium">
          I am Taalay, Mobile App Developer from Kyrgyzstan.
        </p>
        <p class="mt-1 text-sm">
          I have experience developing alone and in a company. Have experience
          with native android (Java, Kotlin) and Flutter for android, ios. Also
          in web development. javascript (React), php (Laravel).
        </p>
        <div class="flex flex-wrap gap-4 items-center mt-3">
          <a
            href="mailto: a.u.taalay@gmail.com"
            class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
          >
            <Icon src={SiGmail} size="48" color="#EA4335" />
          </a>
          <a
            href="https://web.telegram.org/k/#@taalay_dev"
            class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
          >
            <Icon src={SiTelegram} size="48" color="#0088cc" />
          </a>
          <a
            href="https://github.com/TaalayDev"
            class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
          >
            <Icon src={ImGithub} size="48" color="black" />
          </a>
          <a
            href="https://www.linkedin.com/in/taalaydev/"
            class="contact-icon w-10 h-10 flex items-center justify-center rounded-lg"
          >
            <Icon src={SiLinkedin} size="48" color="#0077B5" />
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
        Over the years I have gather experience from individual freelancing and
        working with various teams, startups and organisations. Some are listed
        bellow;
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
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  style="width: {skil.percent}%"
                />
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
    <h2 style="font-size: 25px;" class="font-normal mb-8">Last Projects</h2>
    <div class="">
      {#if innerWidth > 0}
        <Carousel
          autoplay={2000}
          perPage={innerWidth <= 480 ? 1 : innerWidth <= 768 ? 1 : 3}
          dots={false}
        >
          {#each projects as project}
            <ProjectCard
              image={project.image}
              name={project.name}
              description={project.stack.join(", ")}
              platforms={project.platforms}
            />
          {/each}
        </Carousel>
      {/if}
    </div>
  </div>
  <!-- Projects End -->

  <!-- Contact 
  <div class="mt-14 text-left">
    <h2 style="font-size: 25px;" class="font-normal mb-8">Contacts</h2>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      <div
        class="contact-icon w-12 h-12 flex items-center justify-center rounded-lg"
      >
        <Icon src={SiGmail} size="48" color="#EA4335" />
      </div>
      <div
        class="contact-icon w-12 h-12 flex items-center justify-center rounded-lg"
      >
        <Icon src={SiTelegram} size="48" color="#0088cc" />
      </div>
      <div
        class="contact-icon w-12 h-12 flex items-center justify-center rounded-lg"
      >
        <Icon src={ImGithub} size="48" color="black" />
      </div>
    </div>
  </div>
  Contact End -->

  <div class="h-16" />
</main>

<style>
  .me-text {
    color: #50afc0;
    font-weight: 700;
  }
  .contact-icon {
    padding: 10px;
    border: 1px solid rgb(210, 210, 210);
    transition: 0.3s;
  }
</style>
