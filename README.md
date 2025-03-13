# AI-Powered Visual Novel Game

An interactive visual novel game that leverages AI to generate dynamic background images, emojis, and narrative text based on the story context.

## Project Setup

### Using Docker

```sh
docker build -t novel .
docker run -d -p 3000:3000 novel
```
 Open the application in your browser:
  ```sh
   http://localhost:3000
   ```

### Manual Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/MoinZargar/Novel-Game-AI.git
   cd Novel-Game-AI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables by creating a `.env` file.
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open the application in your browser:
  ```sh
   http://localhost:3000
   ```

## Environment Variables

Create a `.env` file in the root of the project and configure the following API keys:

```
FAL_KEY=your_flux_model_key  # Used for AI-based image generation, get it from https://fal.ai/
APIVERVE_EMOJI_KEY=your_apiverve_emoji_key  # Used to generate emojis from text, get it from https://apiverve.com/
APIVERVE_API_ENDPOINT=https://api.apiverve.com/v1/texttoemoji  # API endpoint for text-to-emoji conversion
GEMINI_API_KEY=your_gemini_api_key  # Used to generate narrative text, get it from https://aistudio.google.com/
```

## API Routes

The backend exposes the following API endpoints:

| Route                     | Description                                 |
| ------------------------- | ------------------------------------------- |
| `/api/generate/image`     | Handles AI-based image generation from text |
| `/api/generate/emoji`     | Converts text into relevant emojis          |
| `/api/generate/narrative` | Generates AI-based narrative text           |

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN
- **Validation**: Zod
- **Forms Handling**: React Hook Form


