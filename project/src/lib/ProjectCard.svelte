<script>
    import Icon from "svelte-icons-pack/Icon.svelte";
    import IoLogoGooglePlaystore from "svelte-icons-pack/io/IoLogoGooglePlaystore";
    import IoLogoAppleAppstore from "svelte-icons-pack/io/IoLogoAppleAppstore";
    import ImChrome from "svelte-icons-pack/im/ImChrome";

    export let link = "";
    export let name = "";
    export let description = "";
    export let image = "";
    export let platforms = {};
</script>

<div class="px-2">
    <div
        class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
        <a href={link} class="flex items-center justify-center pt-8 pb-4">
            <img
                class="rounded-t-lg"
                src={image}
                alt=""
                style="height: 150px; width: 150px; border-radius: 180px; object-fit: contain;"
            />
        </a>
        <div class="p-5">
            <a href={link}>
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
                >
                    {name}
                </h5>
            </a>
            <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center"
            >
                {description}
            </p>
            <div class="flex justify-center gap-2">
                {#if platforms.android}
                    <a href={platforms.android}>
                        <Icon src={IoLogoGooglePlaystore} size="18" />
                    </a>
                {/if}
                {#if platforms.ios}
                    <a href={platforms.ios}>
                        <Icon src={IoLogoAppleAppstore} size="18" />
                    </a>
                {/if}
                {#if platforms.web}
                    <a href={platforms.web}>
                        <Icon src={ImChrome} size="18" />
                    </a>
                {/if}
            </div>
        </div>
    </div>
</div>
