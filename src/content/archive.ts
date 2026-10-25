/** Items archived from the admin stay in content/*.json but never reach the site. */
export const live = <T>(items: T[]) => items.filter((x) => !(x as { archived?: boolean }).archived);
