import { html } from '../deps.ts';

export function renderLinks(links: string[]) {
	const linkElements = links.map((link) => {
		const linkObj = new URL(link);
		console.debug('link being rendered', link);
		console.debug('linkObj', linkObj);

		return html`
      <a id="link" class="fave-links-group" href=${linkObj.href} target="_blank">
        ${linkObj.hostname}
      </a>
    `;
	});

	if (links && links.length > 0) {
		return html`
      <section id="fave-links-container">
        <h1>Common links</h1>
        <div id="fave-links">
          ${linkElements}
        </div>
      </section>
    `;
	} else {
		return html`
      <section>
        <p>No links available</p>
      </section>
    `;
	}
}
