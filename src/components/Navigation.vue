<template>
  <nav id="nav" class="bg-purple-400 h-16 w-full flex flex-column justify-center fixed z-50 bg-opacity-20">
    <div class="nav-links-group w-2/12 flex justify-between items-center">
        <router-link to="/" class="nav-link text-white text-xl focus:outline-none">Home</router-link>
        <router-link to="/games" class="nav-link text-white text-xl focus:outline-none">Games</router-link>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navigation'
    
}
</script>

<style>
.nav-link {
    font-family: 'Audiowide', cursive;
}
</style>