# Content Builder

## Generate CSS bundle
```npx tailwindcss -i ./src/app/content-builder/bundle-input.css -o ./public/css/bundle.css --content ./puck.config.tsx --minify```
### Remove :root 
```sed -i '' 's/:root//g' ./public/css/bundle.css```
