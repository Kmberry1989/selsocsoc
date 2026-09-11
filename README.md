# Snug Society

A mobile-first 3D browser game prototype with Firebase-backed player progress and a folder-driven GLB cosmetic catalogue.

## Project structure

```text
snug-society/
├── index.html
├── package.json
├── vercel.json
├── scripts/
│   └── generate-asset-manifests.mjs
└── assets/
    ├── snug-asset-pipeline.js
    ├── cosmetics/
    │   ├── README.md
    │   ├── manifest.json
    │   ├── hairstyles/
    │   ├── outfits/
    │   ├── hand-accessories/
    │   └── shoes/
    ├── environment-props/
    │   ├── README.md
    │   ├── manifest.json
    │   └── *.glb
    ├── textures/
    │   ├── README.md
    │   ├── manifest.json
    │   └── *.svg
    └── vendor/
        ├── draco/
        └── three/
```

## Run locally

Serve the project folder with any static web server. ES modules do not work reliably when `index.html` is opened directly from `file://`.

```bash
npx serve .
```

## Add cosmetic GLBs

1. Drop a Draco-compressed `.glb` into one of the four folders under `assets/cosmetics/`.
2. Push the change to GitHub.
3. Vercel runs `npm run build`, regenerates `assets/cosmetics/manifest.json`, and deploys the updated catalogue.

Filenames become display names automatically: `yellow_raincoat.glb` becomes **Yellow Raincoat**.

See `assets/cosmetics/README.md` for model dimensions, origins, and mobile budgets. The placeholder GLBs are sizing guides.

## Deploy with Vercel

Import the GitHub repository in Vercel. The included `vercel.json` runs the manifest generator and serves this folder as a static site. Add the resulting Vercel domain to Firebase Authentication's authorized domains.
