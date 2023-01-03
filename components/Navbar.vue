<template>
  <div class='nav'>
    <ul class="nav__links">
      <li v-for="link in $store.state.navigations.links" :key="link.alies">
        <NuxtLink :to="link.url">{{ link.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .nav {
    box-sizing: border-box;
    display: flex;
    border: 1px solid black;
    flex-direction: row-reverse;
  }
  a {
    text-decoration: none;
  }
  .nav__links {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 10px;
    gap: 10px
  }
</style>
