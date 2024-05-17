export async function load(event) {
    const data = {};

    if(event.url.pathname === '/') {
        data.showSearchBar = true;
    }
    if(event.locals.user) {
        data.user = event.locals.user;
    }

    return data;
}
