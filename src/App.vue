<template>
  <header>
    <img alt="Honest Greens logo" class="logo" src="./assets/logo.svg" />
  </header>

  <main>
    <div class="wrapper">
      <h1>Users Classification</h1>
      <FilterControls />
      <UsersList />
    </div>
  </main>
</template>

<script setup lang="ts">
import FilterControls from './components/Filters/FilterControls.vue'
import UsersList from './components/UsersList/UsersList.vue'
</script>

<style scoped>
header {
  display: flex;
  justify-content: start;
  width: 100%;
}

.logo {
  display: block;
  width: 3rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100vh;
}
</style>
