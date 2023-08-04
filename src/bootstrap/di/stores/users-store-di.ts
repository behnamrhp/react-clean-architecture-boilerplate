import { DependencyContainer } from "tsyringe"
import usersStore from "~/app/core/users/store/users-store"

const usersStoreDI = (di: DependencyContainer) => {
  di.register<typeof usersStore>(`${usersStore}`, { useValue: usersStore })
}

export default usersStoreDI