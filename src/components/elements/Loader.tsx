import React from 'react'

export const Loader = ({className}: {className?:string}) => <div className={`lds-ellipsis ${className}`}>
<div></div>
<div></div>
<div></div>
<div></div>
</div>