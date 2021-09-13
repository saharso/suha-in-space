import React, {useState, useEffect, useContext, useCallback} from 'react';

const rate = 500;

export default function useFiringRate() {

    const [amount, setAmount] = useState([]);
    
    const remove = useCallback((index)=>{
        setAmount(prev => {prev = prev.splice(index, 1); return [...prev];});
    }, []);

    useEffect(()=>{

        const interval = setInterval(()=>{
            setAmount(prev => {prev.push(null); return [...prev];});
        }, rate);

        return function(){
            clearInterval(interval);
        };
        
    }, []);

    return {amount, remove};
}