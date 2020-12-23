<!-- @format -->

# Next.JS

A simple site with [Next.js](https://nextjs.org/)

## Super Quick Start

```
mkdir project-dir && cd project-dir
npm init
npm i react react-dom next
mkdir pages
touch pages/index.js
```

Export component from `pages/index.js`

Add Scripts to `package.json`

```json
"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"export": "next export",
	}
```

Run

```
npm run dev
```

## NextJS

### Internals/Concepts

-  [Hot Code Reloading - Uses React fast-refresh - maintains state even as code changes](https://nextjs.org/blog/next-9-4#fast-refresh)
-  Code-splitting built in

### Routing

-  Page Based - Pre-render html

### API

-  `link`, `head`, `router`, `amp`

### CLI

#### `dev`

#### `build`

can pass these flags to profile/debug

```
--profile
--debug
```

#### `start`

-  Run in production mode with a server

#### `export`

-  Use for static export

## Resources

-  https://nextjs.org/docs
-  https://explorers.netlify.com/learn/nextjs
