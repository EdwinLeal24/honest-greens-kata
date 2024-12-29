<template>
  <tr>
    <th v-for="heading in headings" :key="heading.key">
      <button @click="headingClickHandler(heading.key)">
        {{ heading.value }}

        <span
          v-if="selectedheading === heading.key"
          class="indicator"
          :class="[isSortAsc ? 'asc' : 'desc']"
        >
        </span>
      </button>
    </th>
  </tr>
</template>

<script setup lang="ts">
interface TableHeadings {
  key: string
  value: string
}

defineProps<{
  headings: TableHeadings[]
  selectedheading: string
  isSortAsc: boolean
}>()

const emit = defineEmits({
  headingClicked: (key: string) => typeof key === 'string',
})

const headingClickHandler = (key: string) => {
  emit('headingClicked', key)
}
</script>

<style scoped>
tr {
  position: relative;
}

tr::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: #ececec;
  height: 1px;
}

th button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: var(--hg-c-white);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

th {
  padding: 0.5rem 2rem;
  text-align: center;
}

.indicator {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  content: '';
  z-index: 1;
}

.asc {
  border-bottom: 5px solid var(--hg-c-white);
}

.desc {
  border-top: 5px solid var(--hg-c-white);
  bottom: -5px;
}

@media (max-width: 768px) {
  th {
    padding: 0.3rem;
  }

  th button {
    font-size: 14px;
  }
}
</style>
