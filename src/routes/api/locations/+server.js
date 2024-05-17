import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        const query = url.searchParams.get('query');

        if(!query) {
            return json({});
        }

        const locationTypes = 'place,postcode,city,neighborhood,street';
        const result = await fetch(`https://api.mapbox.com/search/searchbox/v1/forward?access_token=${PUBLIC_MAPBOX_ACCESS_TOKEN}&types=${locationTypes}&q=${query}`);
        const data = await result.json();

        const locations = (data.features ?? []).map((feature) => {
            const { name, place_formatted } = feature.properties ?? {};
            const [ lon, lat ] = feature.geometry?.coordinates ?? [];

            return { name, place_formatted, coordinates: { lon, lat } };
        });

        return json({ locations });
    } catch (error) {   
        console.error('Failed to get locations', error)
  
        //not passing the error to the response, as it could contain sensitive information (the access token)
        return json({
            error: {
                message: 'Something went wrong, failed to get locations, try again later.',
            }
        }, { status: 500 })
    }
}
