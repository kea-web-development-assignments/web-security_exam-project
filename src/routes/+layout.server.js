export async function load(event) {
    const data = {};

    if(event.url.pathname === '/') {
        data.showSearchBar = true;
    }

    return data;
}
