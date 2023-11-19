<script lang="ts">
  import Router from "svelte-spa-router";
  import Navbar from "./lib/Navbar.svelte";
  import Home from "./routes/Home.svelte";
  import NotFound from "./routes/NotFound.svelte";

  let innerWidth = 0;
  $: perPage = innerWidth <= 480 ? 1 : innerWidth <= 768 ? 1 : 3;

  const routes = {
    "/": Home,
    "/h": NotFound,
  };
</script>

<Navbar />
<Router {routes} />
