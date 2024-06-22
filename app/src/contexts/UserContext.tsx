// import React, { createContext, useState } from 'react'

// const UserContext = createContext()

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// export { UserContext, UserProvider }

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../models'

// Defina a estrutura do contexto
interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
}

// Crie o contexto com valor padrão
const UserContext = createContext<UserContextType | undefined>(undefined)

// Crie um hook para usar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext)

  if (!context) throw new Error('useUser must be used within a UserProvider')

  return context
}

// Defina a interface para as propriedades do provider
interface Props {
  children: ReactNode
}

// Crie o provider
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
