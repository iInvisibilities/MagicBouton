export async function GET({ url }) {
	let paletteCont = await fetch('https://colorhunt.co/palette/' + url.searchParams.get('theme'), {
		headers: {
			Range: 'bytes=0-500'
		}
	});
	let paletteContText = await paletteCont.text();

	return new Response(paletteContText);
}
