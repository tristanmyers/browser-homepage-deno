import { html } from 'html';
import { DB } from 'sqlite';

// TODO: replaceAll() is not a good solution.
export async function app(userId: number, db: DB): Promise<string> {
	const page = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tees Homepage</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="./public/styles/index.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://rsms.me/inter/inter.css"
        />
          <style>
              body, html {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  /* overflow: hidden; */ /* Prevent scrolling on the body */
              }

              #background {
                  position: fixed; /* Keep the background fixed */
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  z-index: -1; /* Place it behind other content */
                  overflow: hidden; /* Prevent overflow */
              }

              .content {
                  position: relative;
                  z-index: 1; /* Place content above the background */
                  padding: 20px;
                  height: 200vh; /* Make content tall enough to scroll */
                  background: rgba(255, 255, 255, 0); /* Semi-transparent background for readability */
              }

          </style>
          <script>
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              document.getElementById('background').appendChild(canvas);

              let creatureY = 0;
              let creatureX = 0; // Initialize the x-coordinate
              let rocks = [];
              const gravity = 0.5;
              const creature = new Image();
              creature.src = 'https://cdn.7tv.app/emote/01H3ZS4R1R0003PH84VNH1WMYC/4x.avif'; // Replace with your creature image path

              function resizeCanvas() {
                  canvas.width = window.innerWidth;
                  canvas.height = window.innerHeight;
              }

              function createRocks() {
                  for (let i = 0; i < 5; i++) {
                      rocks.push({
                          x: Math.random() * canvas.width,
                          y: Math.random() * canvas.height,
                          width: 50,
                          height: 20
                      });
                  }
              }

              function drawRocks() {
                  ctx.fillStyle = 'gray';
                  rocks.forEach(rock => {
                      ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
                  });
              }

              function spawnCreature() {
                  // Generate a random x-coordinate for the creature
                  creatureX = Math.random() * (canvas.width - 50); // Adjust for creature width
                  creatureY = 0; // Reset the y-coordinate to the top
              }

              function animate() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);

                  // Draw rocks
                  drawRocks();

                  // Update creature position
                  if (creatureY < canvas.height) {
                      creatureY += gravity; // Apply gravity
                  } else {
                      spawnCreature(); // Spawn a new creature at a random x-coordinate
                  }

                  // Draw creature
                  ctx.drawImage(creature, creatureX, creatureY, 50, 50); // Adjust size and position

                  requestAnimationFrame(animate);
              }

              window.addEventListener('resize', () => {
                  resizeCanvas();
              });

              resizeCanvas();
              createRocks();
              spawnCreature(); // Initial spawn
              animate();

          </script>
      </head>
      <body>
        <section id="banner-container">
          <p id="scrolling-banner">Hello, world! Am I scrolling?</p>
        </section>
        <div id="background"></div>
        <div class="content">
                <h1>Your Website Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <!-- Add more content here -->
            </div>
            <script src="script.js"></script>
            </body>
            </html>
        <footer>
          Made by <a href="https://tristanmyers.dev/">Tristan Myers</a>
        </footer>
      </body>
    </html>
  `;

	return page;
}
