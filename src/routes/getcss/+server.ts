import { promises as fs } from 'fs';
import path from 'path';

export async function GET({ params, url }) {
	let fromCol = url.searchParams.get('from');
	let viaCol = url.searchParams.get('via');
	let toCol = url.searchParams.get('to');

	const filePath = path.join(process.cwd(), 'static', 'MagicBouton_b0.1.css');

	let fileContent = await fs.readFile(filePath, 'utf-8');

	fileContent = fileContent.replace('#fa5477', fromCol);
	fileContent = fileContent.replace('#ef4b4b', viaCol);
	fileContent = fileContent.replace('#f2e3c9', toCol);

	return new Response(fileContent, {
		status: 200,
		headers: {
			'Content-type': 'text/css',
			'Content-Disposition': 'attachment; filename=MagicBouton_b0.1.css'
		}
	});
}
