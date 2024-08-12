<script lang="ts">
	let colorHuntFeed: [] | null = null;

	async function loadColorHuntFeed() {
		if (colorHuntFeed != null) {
			loadRandomTheme();
			return;
		}
		let rawColorHuntFeed = await fetch('/colorhuntfeedhaha');
		let rawJsonColorHuntFeed = await rawColorHuntFeed.json();
		colorHuntFeed = rawJsonColorHuntFeed.map((feedElementObject: any) => feedElementObject['code']);
		loadRandomTheme();
	}

	async function loadRandomTheme() {
		if (colorHuntFeed == null) return;

		let randomTheme = colorHuntFeed[Math.floor(Math.random() * colorHuntFeed.length)];
		let themeColors = await fetch('/colorhuntpalettehaha?theme=' + randomTheme);
		let themeColorsRawString: any = await themeColors.text();
		let themeColorsString = themeColorsRawString.match(/<title[^>]*>([^<]+)<\/title>/)[0];
		let colors = themeColorsString.substring(22, 53).split(' ');

		document.documentElement.style.setProperty('--magic-button-from', colors[0]);
		document.documentElement.style.setProperty('--magic-button-via', colors[1]);
		document.documentElement.style.setProperty('--magic-button-to', colors[2]);
	}

	async function getCSS() {
		let fromCol = getComputedStyle(document.documentElement).getPropertyValue(
			'--magic-button-from'
		);
		let viaCol = getComputedStyle(document.documentElement).getPropertyValue('--magic-button-via');
		let toCol = getComputedStyle(document.documentElement).getPropertyValue('--magic-button-to');

		window.location.assign(
			'/getcss?from=' +
				encodeURIComponent(fromCol) +
				'&via=' +
				encodeURIComponent(viaCol) +
				'&to=' +
				encodeURIComponent(toCol)
		);
	}
</script>

<div class="absolute left-5 top-5">
	<!-- the magic text component is coming soon, if you don't see it posted here make sure to annoy me about it until i add it-->
	<!-- most probably will add it once somebody annoys me about it for once because i love what i do -->
	<div class="magic-text">
		<h1 class="text-5xl font-bold">
			Magic<span class="font-extrabold italic">Bouton</span>
			<p class="text-end text-sm font-light italic">
				made by <strong>Invisibilities</strong>
			</p>
		</h1>
	</div>
</div>

<div class="cont">
	<div class="magic-input">
		<!-- Has to specify at least an empty placeholder(placeholder="") for the effect to work!-->
		<input type="text" placeholder=".magic-input" />
	</div>
	<button class="magic-button"><span>.magic-button</span></button>
	<button class="semi-magic-button"><span>.semi-magic-button</span></button>
	<div class="magic-card">
		<article>
			<h1>.magic-card</h1>
			<ul>
				<li>
					The button element's content is put inside a <strong>&lt;span&gt;</strong>
				</li>
				<li>
					The input element is surrounded by a <strong>&lt;div&gt;</strong> which has the
					"magic-input" class parenting the actual <strong>&lt;input&gt;</strong> element.
				</li>
				<li>
					The card element is surrounded by a <strong>&lt;div&gt;</strong> parenting an
					<strong>&lt;article&gt;</strong> element which has an
					<strong>&lt;h1&gt;</strong>
					as the title, an <strong>&lt;img&gt;</strong> as its cover and anything in between the
					<strong>&lt;h1&gt;</strong>
					& <strong>&lt;img&gt;</strong> serves as content.
				</li>
			</ul>
		</article>
		<img src="https://i.redd.it/5ubq6jf2jgx01.jpg" alt="" />
	</div>
	<div class="grid gap-2">
		<button class="magic-button" style="max-width: 300px;" on:click={loadColorHuntFeed}
			><span>Randomize my outfit</span></button
		>
		<button on:click={getCSS} class="semi-magic-button" style="max-width: 300px;"
			><span>Download using this palette</span></button
		>
	</div>
</div>
