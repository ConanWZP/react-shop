import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = (props: any) => {
    return (
        <ContentLoader
            speed={2}
            width={500}
            height={500}
            viewBox="0 0 500 500"
            backgroundColor="#e2e9e8"
            foregroundColor="#d9d9d9"
            {...props}
        >
            <rect x="119" y="188" rx="0" ry="0" width="0" height="1" />
            <rect x="142" y="131" rx="0" ry="0" width="0" height="1" />
            <rect x="111" y="71" rx="10" ry="10" width="333" height="386" />
        </ContentLoader>
    );
};

export default SkeletonLoader;