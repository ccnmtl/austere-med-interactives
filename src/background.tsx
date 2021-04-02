import React from 'react';

interface BackgroundProps {
    backgroundImageSrc: string;
}

export const Background: React.FC<BackgroundProps> = ({backgroundImageSrc}: BackgroundProps) => {
    return (
        <div id={'background-image'} style={{backgroundImage: `url(${backgroundImageSrc})`}}></div>
    );
};
