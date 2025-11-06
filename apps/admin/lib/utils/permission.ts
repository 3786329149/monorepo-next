export function filterMenusByPermission(menus: any[], permissions: string[]) {
  return menus.filter((item) => {
    if (item.children) {
      item.children = filterMenusByPermission(item.children, permissions);
    }
    return !item.permissions || permissions.includes(item.permissions);
  });
}
