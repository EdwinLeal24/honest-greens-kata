<script setup lang="ts">
import TableUtils from './components/Filters/TableUtils.vue'
import UsersList from './components/UsersList/UsersList.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" />
  </header>

  <main>
    <div class="wrapper">
      <h1>Users Classification</h1>
      <TableUtils />
      <UsersList />
    </div>
  </main>
</template>

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
