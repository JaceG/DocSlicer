'use client';

import Script from 'next/script';

const ADSENSE_CLIENT_ID = 'ca-pub-9935452437578823';

export default function AdSenseProvider() {
	return (
		<Script
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
			crossOrigin='anonymous'
			strategy='afterInteractive'
		/>
	);
}
