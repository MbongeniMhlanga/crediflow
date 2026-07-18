import type { UserDTO } from "../types";

export const isAdminUser = (user: UserDTO | null | undefined) =>
  !!user?.roles?.some((role) => role.roleName === "ADMIN");
