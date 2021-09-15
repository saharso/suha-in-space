import React, {useState, useEffect, useContext, useCallback} from 'react';

const rate = 1000;

export default function useFiringRate() {

    const [amount, setAmount] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    const [removalRequests, setRemovalRequests] = useState(new Set());
    const [additionalRequest, setAdditionalRequest] = useState(new Set());
    
    const remove = useCallback((id)=>{
        console.log(`${id} is at the bottom of the screen`);
        console.log(additionalRequest.has(+id));
        setAdditionalRequest(prev => {prev.delete(+id); return new Set(prev);});
        setAdditionalRequest(new Set());
    }, []);

    const add = useCallback((idCounter) => {
        setAdditionalRequest(prev => {prev.add(idCounter); return new Set(prev);});
    }, []);

    const updateCounter = ()=>{
        setIdCounter(prev => prev + 1);
    };

    useEffect(()=>{
        add(idCounter);
    }, [idCounter]);

    useEffect(()=>{
        setAmount(()=>{
            const filterRemoved = Array.from(additionalRequest);
            return filterRemoved;
        });

    }, [additionalRequest]);

    useEffect(()=>{
        console.log(amount);
        
    }, [amount]);


    useEffect(()=>{

        const interval = setInterval(updateCounter, rate);

        return function(){
            clearInterval(interval);
        };
        
    }, []);

    return {amount, remove};
}