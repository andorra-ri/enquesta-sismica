// place files you want to import through the `$lib` alias in this folder.
import { goto } from '$app/navigation';

export const routeToPage = (route: string, replaceState: boolean) => {
	goto(`/${route}`, { replaceState });
};
