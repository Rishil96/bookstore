# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Inital Set of Commands to setup React and Tailwind CSS

- **npm create vite@latest** then type project name, select React and then select JavaScript.
- **npm i** go to project folder then run this.
- Below 2 commands to setup tailwind CSS in our project folder.
- **npm install -D tailwindcss postcss autoprefixer**
- **npx tailwindcss init -p**

- Paste the below content in tailwind.config.js Content key.
```
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
- Go to index.css, delete everything and then paste this
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Delete App.css

- Go to App.jsx, delete everything and create a new component using rafce (install ES7+ extension in VS Code)
