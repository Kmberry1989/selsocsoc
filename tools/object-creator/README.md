# Object Creator — Selfie Social Society

Build 3D objects from user-colored primitives and export game-ready GLBs.
Part of the Creator Suite (four external editors for expanding the game).

## Features
- Drag individual vertices, paint colors per face
- Apply textures (PNG/JPEG/WebP uploads, tiling controls)
- Mirror mode (X/Y/Z), reusable part library, peg-avatar scale preview

## Run it
Serve this folder with any static server (or open `index.html`) and build.

## Pipeline
1. Build the object, export the GLB
2. Drop it in the game repo's auto-discovered asset folders
   (`Kmberry1989/selsocsoc`)
3. Export in meters, embedded textures, under 25k triangles / 2 MB
4. Push — Vercel auto-deploys; the game picks it up automatically
