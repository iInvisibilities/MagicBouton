export async function GET({ params, url }) {
	let fromCol: string | null = url.searchParams.get('from');
	let viaCol: string | null = url.searchParams.get('via');
	let toCol: string | null = url.searchParams.get('to');

	const response = await fetch('/MagicBouton_b0.1.css');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	let cssContent = await response.text();
	cssContent = cssContent
		.replace('#fa5477', fromCol ?? '#fa5477')
		.replace('#ef4b4b', viaCol ?? '#ef4b4b')
		.replace('#f2e3c9', toCol ?? '#f2e3c9');

	return new Response(cssContent, {
		status: 200,
		headers: {
			'Content-type': 'text/css',
			'Content-Disposition': 'attachment; filename=MagicBouton_b0.1.css'
		}
	});
}
