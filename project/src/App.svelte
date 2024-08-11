<script lang="ts">
  import Router from "svelte-spa-router";
  import Navbar from "./lib/Navbar.svelte";
  import Home from "./routes/Home.svelte";
  import NotFound from "./routes/NotFound.svelte";

  const routes = {
    "/": Home,
    "/h": NotFound,
  };
</script>

<Navbar />
<Router {routes} />
