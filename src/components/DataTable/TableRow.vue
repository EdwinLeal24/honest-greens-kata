<template>
  <tr>
    <td v-for="(value, index) in values" :key="index">{{ value }}</td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  values: Array<string | number>
}>()
</script>

<style scoped>
td {
  padding: 0.5rem 2rem;
  text-align: center;
}

tr {
  position: relative;
}

tr:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: #cccccc1c;
  height: 1px;
}

@media (max-width: 768px) {
  td {
    padding: 0.3rem;
  }
}
</style>
