interface Iusers {
  name: string,
}
export async function getUsers(): Promise<Iusers[]> {
  return await [{ name: "Javi" }, { name: "Núria" }];
}
