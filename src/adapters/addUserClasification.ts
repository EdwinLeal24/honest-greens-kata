import type { User } from '@/schemata/User'

export interface ClasificatedUser extends User {
  isPolloConHierbasLover: boolean
}

const KEY_LETTERS_TO_LOVER = ['H', 'B'] as const

export const addUserClasification = (users: User[]): ClasificatedUser[] => {
  return users.map((user) => {
    return {
      ...user,
      isPolloConHierbasLover: KEY_LETTERS_TO_LOVER.some((letter) =>
        user.name.toLowerCase().includes(letter.toLowerCase()),
      ),
    }
  })
}
