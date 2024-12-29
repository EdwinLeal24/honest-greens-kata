<template>
  <div>
    <h3 v-if="error">{{ error }}</h3>

    <template v-else>
      <template v-if="sortedUsers.length">
        <DataTable>
          <template #table-heading>
            <TableHeading
              :headings="tableHeadings"
              :selectedheading="store.filters.sortByKey"
              :isSortAsc="store.filters.isSortAsc"
              @headingClicked="headingClickHandler"
            />
          </template>

          <template #table-body>
            <template v-for="user in sortedUsers" :key="user.id">
              <TableRow
                :values="[
                  user.id,
                  user.name,
                  user.age,
                  user.isPolloConHierbasLover ? 'Pollo con Hierbas' : 'Pollo Piri Piri',
                ]"
              />
            </template>
          </template>
        </DataTable>
      </template>

      <h3 v-else>No user with selected criterials. Try a different one.</h3>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ClasificatedUser } from '@/adapters/addUserClasification'
import { useFetchUsers } from '@/composables/useFetchUsers'
import { store } from '@/stores/filters'
import { computed } from 'vue'
import DataTable from '../DataTable/DataTable.vue'
import TableRow from '../DataTable/TableRow.vue'
import TableHeading from '../DataTable/TableHeading.vue'

interface TableHeadings {
  key: keyof ClasificatedUser
  value: string
}

const tableHeadings: TableHeadings[] = [
  {
    key: 'id',
    value: 'User ID',
  },
  {
    key: 'name',
    value: 'Name',
  },
  {
    key: 'age',
    value: 'Age',
  },
  {
    key: 'isPolloConHierbasLover',
    value: 'Is lover of',
  },
]
const { users, error } = useFetchUsers()

const piriPiriLovers = computed(() => users.value.filter((user) => !user.isPolloConHierbasLover))

const hierbasLovers = computed(() => users.value.filter((user) => user.isPolloConHierbasLover))

const clasifiedUsers = computed(() => {
  const usersMap = {
    polloPiriPiri: piriPiriLovers.value,
    polloHierbas: hierbasLovers.value,
  }

  return usersMap[store.filters.loverOf as keyof typeof usersMap] || users.value
})

const filteredUsers = computed(() => {
  return clasifiedUsers.value.filter((user) =>
    user.name.toLowerCase().includes(store.filters.name.toLowerCase()),
  )
})

const sortedUsers = computed(() => {
  if (!store.filters.sortByKey) return filteredUsers.value
  const sortBy = store.filters.sortByKey as keyof ClasificatedUser

  const sortedList = [...filteredUsers.value].sort((userA, userB) => {
    if (store.filters.isSortAsc) return userA[sortBy] > userB[sortBy] ? 1 : -1
    if (!store.filters.isSortAsc) return userA[sortBy] < userB[sortBy] ? 1 : -1
    return 0
  })

  return sortedList
})

const headingClickHandler = (key: string) => {
  store.setSortByKey(key)
  store.setIsSortAsc()
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
