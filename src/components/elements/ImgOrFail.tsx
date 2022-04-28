import React, {useState} from 'react'

import failImage from '../../assets/img-broken.png'

export const ImgOrFail = ({
    src,
    className,
    width,
    alt,
    height
} : {
    src: string;
    className:string;
    alt?:string,
    width: number;
    height: number
}) => {

    const [failed, setFailed] = useState(false)

    return <img alt={alt} src={!failed? src: failImage} className={className} width={width} height={height} onError={() => setFailed(true)}/>
}