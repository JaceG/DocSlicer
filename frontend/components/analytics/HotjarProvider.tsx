'use client';

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

const siteId = 6513087;
const hotjarVersion = 6;

export default function HotjarProvider() {
	useEffect(() => {
		Hotjar.init(siteId, hotjarVersion);
	}, []);

	return null;
}
