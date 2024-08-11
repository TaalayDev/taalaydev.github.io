<script>
    import Icon from "svelte-icons-pack/Icon.svelte";
    import IoLogoGooglePlaystore from "svelte-icons-pack/io/IoLogoGooglePlaystore";
    import IoLogoAppleAppstore from "svelte-icons-pack/io/IoLogoAppleAppstore";
    import ImChrome from "svelte-icons-pack/im/ImChrome";

    import playstore from "../assets/playstore.svg";
    import appstore from "../assets/app-store.svg";
    import web from "../assets/internet-explorer.svg";

    export let link = "";
    export let name = "";
    export let description = "";
    export let image = "";
    export let platforms = {};
    export let onClick = () => {};
</script>

<div class="card-container py-2" on:click={onClick}>
    <div
        class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 px-10 w-[100%] h-full"
    >
        <div class="flex items-center justify-center pt-8 pb-4">
            <img
                class="rounded-t-lg"
                src={image}
                alt=""
                style="height: 150px; width: 150px; border-radius: 180px; object-fit: contain;"
            />
        </div>
        <div class="py-5">
            <div>
                <h5
                    class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
                >
                    {name}
                </h5>
            </div>
            <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center"
            >
                {description}
            </p>
            <div class="flex justify-center gap-2">
                {#if platforms.android}
                    <a href={platforms.android}>
                        <img src={playstore} alt="playstore" width="20" />
                    </a>
                {/if}
                {#if platforms.ios}
                    <a href={platforms.ios}>
                        <img src={appstore} alt="appstore" width="20" />
                    </a>
                {/if}
                {#if platforms.web}
                    <a href={platforms.web}>
                        <img src={web} alt="web" width="20" />
                    </a>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 360px;
        max-height: 360px;
        width: 300px;
    }
</style>
