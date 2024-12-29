import { reactive } from 'vue'

interface FiltersStore {
  filters: {
    loverOf: string
    name: string
    sortByKey: string
    isSortAsc: boolean
  }
  setLoverOf: (optionToLove: string) => void
  setSortByKey: (sortKey: FiltersStore['filters']['sortByKey']) => void
  setIsSortAsc: () => void
}

export const store = reactive<FiltersStore>({
  filters: {
    loverOf: '',
    name: '',
    sortByKey: '',
    isSortAsc: true,
  },
  setLoverOf,
  setSortByKey,
  setIsSortAsc,
})

function setLoverOf(optionToLove: string): void {
  store.filters.loverOf = optionToLove
}

function setSortByKey(sortByKey: FiltersStore['filters']['sortByKey']): void {
  store.filters.sortByKey = sortByKey
}

function setIsSortAsc(): void {
  store.filters.isSortAsc = !store.filters.isSortAsc
}
