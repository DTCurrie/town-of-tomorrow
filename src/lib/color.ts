export const playCardColors = [
    'sky',
    'amber',
    'emerald',
    'pink',
    'violet',
    'teal',
];

export type Color = 'sky' | 'amber' | 'emerald' | 'pink' | 'violet' | 'teal' | 'rose' | 'cyan' | 'lime';
export const colors = [
    'rose',
    'cyan',
    'lime'
];

export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export const colorShades = [
    '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'
];

export const getColorClass = (setting: string, color: Color, shade: ColorShade = '500') =>
    `${setting}-${color}-${shade}`;

export const getArbitraryColor = (source: string[], seed: string) => {
    const charCodes = seed.split('').reduce((a: number, b: string, i: number) => {
        return (i == 1 ? `${a}`.charCodeAt(0) : +a) + b.charCodeAt(0);
    }, 0);

    return source[charCodes % source.length]
}


export const getArbitraryColorClass = (setting: string, seed: string, shade: ColorShade = '500') =>
    `${setting}-${getArbitraryColor(colors, seed)}-${shade}`;