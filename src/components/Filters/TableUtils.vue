<template>
  <div class="filtersWrapper">
    <DropdownButton
      label="Classify By"
      :defaultOption="{ key: '-', value: '-' }"
      :options="ClassificationOptions"
      @option-selected="classifyBySelectedHandle"
    />

    <DropdownButton
      label="Lover Of"
      :options="loverOptions"
      @option-selected="loverOfSelectedHandle"
    />

    <div class="inputName">
      <p>Search by name</p>
      <input type="text" v-model="store.filters.name" placeholder="Type a name" />
    </div>

    <button @click.stop="store.setIsSortAsc">
      <IconSort class="sortIcon" :class="{ turnedIcon: !store.filters.isSortAsc }" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/stores/filters'
import DropdownButton from '../DropdownButton/DropdownButton.vue'
import IconSort from '../icons/IconSort.vue'

const ClassificationOptions = [
  { key: 'name', value: 'Name' },
  { key: 'age', value: 'Age' },
  { key: 'isPolloConHierbasLover', value: 'Profile' },
]

const loverOptions = [
  { key: 'all', value: 'All' },
  { key: 'polloHierbas', value: 'Pollo Hierbas' },
  { key: 'polloPiriPiri', value: 'Pollo Piri Piri' },
]

const classifyBySelectedHandle = (optionSelected: string) => {
  store.setSortByKey(optionSelected)
}

const loverOfSelectedHandle = (optionSelected: string) => {
  store.setLoverOf(optionSelected)
}
</script>

<style scoped>
.filtersWrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid #fff;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  border-radius: 0.7rem;
}

.inputName {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.inputName input {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  height: 100%;
}

.inputName input:focus {
  outline-color: #afafaf;
}

button {
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  cursor: pointer;
  height: fit-content;
}

.sortIcon {
  transition: transform 0.2s ease-in;
}

.turnedIcon {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .filtersWrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
