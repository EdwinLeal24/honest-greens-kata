<script setup lang="ts">
import { useFetchUsers } from '@/composables/useFetchUsers'

// defineProps<{
//   msg: string
// }>()

const { users, error } = useFetchUsers()
</script>

<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <template v-else>
      <div v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.isPolloConHierbasLover }}
      </div>
    </template>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
