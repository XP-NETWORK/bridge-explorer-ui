import React, {useState, useEffect} from 'react'

import failImage from '../../assets/img-broken.png'

export const ImgOrFail = ({
    src,
    className,
    width,
    alt,
    height,
    setFetching
} : {
    src: string;
    className:string;
    alt?:string,
    width: number;
    height: number;
    setFetching?: any
}) => {

    const [failed, setFailed] = useState(false)

    useEffect(() => {
        src &&  setFailed(false)
    },[src])

    return <img alt={alt} src={!failed? src: failImage} className={className} width={width} height={height} onError={() => setFailed(true)}  onLoad={() =>  {
        if (src) {
            setFetching&& setFetching(false)
        }
    }}/>
}