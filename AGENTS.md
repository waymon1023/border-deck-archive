# AGENTS.md

## Project
This is a pure static showcase website for an original poker-card survival game archive.

Before making product, UI, content, or architecture decisions, read `CONTEXT.md`.

## Important constraints
- Do not use official Alice in Borderland logos, screenshots, posters, actors, characters, or copied game rules.
- Keep the project original: original card games, original UI, original generated images.
- Visual style: dark, cinematic, survival-game atmosphere, floating poker cards, subtle neon, restrained motion.
- Data should be driven by card data files, so A-K cards can be expanded later.
- Prefer simple static deployment to Cloudflare Pages or Vercel.

## First implementation goal
Build the homepage with:
- floating poker card field
- central title/logo area
- slow drift animation
- occasional auto flip animation
- hover highlight
- click-to-open card detail page

Start with the four K cards from `CONTEXT.md`.