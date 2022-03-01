import React, {useState, useEffect} from 'react';

const mockNode = {
  name: 'Avraam Nowar',
  owner: '868562846gf...234',
  type: 'MPC Node',
  days: '323',
  version: '7.5.3-stable',
  staking: 0,
  statusText: 'online'
}

export const NetworkContext = function (Wrapped: React.FC<any>) {
    
    return function Callback() {

      const [nodes, setNodes] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);


 
    useEffect(() => {
      setTimeout(() => {
        setNodes(Array.from(new Array(12).fill(mockNode)));
      }, 1000)
      
      }, []);



      useEffect(() => {
        setLoading(false)
      }, [nodes]);


    return <Wrapped nodes={nodes} loading={loading}/>
  }
}