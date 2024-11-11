import { html } from 'html';

// Transform each string in the array to a url and make a component.
// If the link can not be parsed to a url just add 'https://' to the beginning.
export function renderLinks(links: string[]) {
	const linkElements = links.map((link) => {
		let linkObj: URL | string = link;
		if (URL.canParse(link)) {
			linkObj = new URL(link);
			console.debug('link being rendered', link);
			console.debug('linkObj', linkObj);

			return html`
			  <a id="link" class="fave-links-group" href=${linkObj.href} target="_blank">
				${linkObj.hostname}
			  </a>
			`;
		} else {
			console.debug('link being rendered', link);

			return html`
			  <a id="link" class="fave-links-group" href=${'https://' + linkObj} target="_blank">
				${linkObj}
			  </a>
			`;
		}
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
