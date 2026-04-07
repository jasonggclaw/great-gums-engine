# Great Gums Image Assets

All images used in generated landing pages are stored here and registered in `/assets/images.json`.

## Folder Structure

```
/assets/images/
  /heroes/          Full-bleed hero background images
  /lifestyle/       People-focused lifestyle shots
  /products/        Clean studio product photography
  /editorial/       High-contrast B&W editorial images
  /abstract/        Artistic/creative shots
```

## Photography Guidelines

### Heroes
- Dramatic macro or close-up shots
- Dark backgrounds preferred
- Brand-blue tinting works well
- Use: gum disease angle, fear-based ads, dark hero sections

### Lifestyle
- Tight face crops
- Natural light only
- Authentic smiles, no heavy makeup
- Use: trust building, relatability

### Products
- Clean white or grey studio backgrounds
- Soft shadows
- Use: product introductions, clinical sections

### Editorial
- High contrast black and white
- Use: "The Brutal Truth" sections, pain-point sections

### Abstract
- Artistic product shots with shadows or color backgrounds
- Use: section breaks, premium feels

## Adding Images

1. Add the physical file to the appropriate subfolder
2. Register it in `/assets/images.json` with:
   - `file`: relative path from `/assets/images/`
   - `tags`: array of descriptive tags
   - `mood`: single-word mood descriptor
   - `style`: one of `hero`, `lifestyle`, `product`, `editorial`, `abstract`
   - `bestFor`: array of use cases

## Usage in Pages

Images are placed in the `public/` folder for Next.js to serve them.
Copy images to `/public/images/[category]/[filename]` and reference them as `/images/[category]/[filename]` in page components.

Or use the path `/assets/images/[category]/[filename]` and configure Next.js to serve the assets folder.
