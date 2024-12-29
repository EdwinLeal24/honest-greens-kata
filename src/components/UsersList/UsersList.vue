<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <template v-else>
      <template v-if="sortedUsers.length">
        <table>
          <thead>
            <tr>
              <th v-for="heading in tableHeadings" :key="heading.key">
                <button class="tableHeading" @click="headingClickHandler(heading.key)">
                  {{ heading.value }}

                  <span
                    v-if="store.filters.sortByKey === heading.key"
                    class="indicator"
                    :class="[store.filters.isSortAsc ? 'asc' : 'desc']"
                  >
                  </span>
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            <template v-for="user in sortedUsers" :key="user.id">
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.age }}</td>
                <td>{{ user.isPolloConHierbasLover ? 'Pollo con Hierbas' : 'Pollo Piri Piri' }}</td>
              </tr>
            </template>
          </tbody>
        </table>
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

const headingClickHandler = (key: keyof ClasificatedUser) => {
  store.setSortByKey(key)
  store.setIsSortAsc()
}
</script>

<style scoped>
table {
  border: 1px solid #fff;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

thead th button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
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
  border-bottom: 5px solid #fff;
}
.desc {
  border-top: 5px solid #fff;
  bottom: -5px;
}

td,
th {
  padding: 0.5rem 2rem;
  text-align: center;
}

table thead tr,
table tbody tr {
  position: relative;
}

table thead tr::after,
table tbody tr:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: #cccccc1c;
  height: 1px;
}

table thead tr::after {
  background: #ececec;
  height: 1px;
}

h3 {
  margin-top: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  td,
  th {
    padding: 0.3rem;
  }

  thead th button {
    font-size: 14px;
  }
}
</style>
