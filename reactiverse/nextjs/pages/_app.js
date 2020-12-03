/** @format */

import '../styles.css'

export default function Application({Component, pageProps}) {
	return <Component {...pageProps} />
}

export function reportWebVitals(metric) {
	// console.log(metric)
	if (metric.label === 'web-vital') {
		// metric.name can be FCP, LCP, CLS, FID, TTFB
	}
	if (metric.label === 'custom') {
		// metric.name can be Next.js-hydration,
		// Next.js-route-change-to-render, Next.js-render
	}
}
