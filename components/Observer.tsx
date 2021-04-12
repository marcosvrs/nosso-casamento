import React, { useEffect } from "react";

interface ObserverProps {
    value: any;
    didUpdate: (value: any) => void
}

export const Observer = ({ value, didUpdate }: ObserverProps) => {
    useEffect(() => {
        didUpdate(value)
    }, [value, didUpdate]);

    return null; // component does not render anything
}