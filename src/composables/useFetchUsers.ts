import { addUserClasification } from '@/adapters/addUserClasification'
import type { User } from '@/schemata/User'
import { fetchData } from '@/services/fetch'
import { computed, ref } from 'vue'

export function useFetchUsers() {
  const userList = ref<User[]>([])
  const error = ref<string | null>(null)

  const users = computed(() => addUserClasification(userList.value))

  const fetchUsers = async () => {
    const [data, err] = await fetchData<User>()

    if (err) {
      error.value = err
    }

    if (!data) return
    userList.value = data
  }

  fetchUsers()

  return { users, error }
}
