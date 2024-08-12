import { json } from '@sveltejs/kit'

export async function GET() {
	let formData = new FormData()
	formData.append('step', '0')
	formData.append('sort', 'random')

	let response = await fetch('https://colorhunt.co/php/feed.php', {
		method: 'POST',
		body: formData
	})
	let jsonRes = await response.json()

	return json(jsonRes)
}
