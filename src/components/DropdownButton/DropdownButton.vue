<template>
  <div>
    <p>{{ label }}</p>

    <div class="dropdown">
      <button @click="dropdownButtonClickHandler">
        {{ selectedOption }}

        <IconDropArrow class="icon" :class="{ turnedIcon: isDropdownVisible }" />
      </button>

      <ul :class="{ optionVisible: isDropdownVisible }">
        <li v-for="(option, index) in options" :key="index">
          <a @click.stop="optionClickHandler(option)">{{ option.value }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconDropArrow from '../icons/IconDropArrow.vue'
import { ref } from 'vue'

interface Option {
  key: string
  value: string
}

interface DropdownProps {
  label: string
  options: Option[]
  defaultOption?: Option
}

const props = defineProps<DropdownProps>()

const emit = defineEmits({
  optionSelected: (option: string) => typeof option === 'string',
})

const isDropdownVisible = ref(false)
const selectedOption = ref(props.defaultOption?.value || props.options[0].value)

const dropdownButtonClickHandler = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const optionClickHandler = (option: Option) => {
  selectedOption.value = option.value
  isDropdownVisible.value = false
  emit('optionSelected', option.key)
}

window.addEventListener('click', (event) => {
  if (!(event.target as HTMLElement).closest('.dropdown')) {
    isDropdownVisible.value = false
  }
})
</script>

<style scoped>
.dropdown {
  background-color: #fff;
  border-radius: 0.5rem;
  position: relative;
}

button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  border: none;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #3b3b3b;
  cursor: pointer;
  min-width: 150px;
}

.icon {
  transition: transform 0.2s ease-in;
}

.turnedIcon {
  transform: rotate(180deg);
}

ul {
  display: none;
  margin-top: 0.25rem;
  padding: 0;
  opacity: 0;
  width: 100%;
}

.optionVisible {
  display: flex;
  flex-direction: column;
  opacity: 1;
  position: absolute;
  background: #fff;
  border-radius: 0.5rem;
  z-index: 1;
}

ul li {
  text-decoration: none;
  list-style: none;
  color: #3b3b3b;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

ul li:hover {
  background-color: #e9e9e9;
}

li a {
  display: block;
}
</style>
