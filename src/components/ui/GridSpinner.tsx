'use client';

import dynamic from 'next/dynamic';
import { DotLoader } from 'react-spinners';

const GridLoader = dynamic(() => import('react-spinners/GridLoader'), {
    ssr: false
});
type Props = {
    color?: string;
};
export default function GridSpinner({ color = 'indigo' }: Props) {
    return <DotLoader color={color} />;
}
