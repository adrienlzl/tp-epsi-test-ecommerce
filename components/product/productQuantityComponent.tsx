
'use client'
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

interface ProductQuantityComponentProps {
    onQuantityChange: (quantity: number) => void
}

export default function ProductQuantityComponent({
                                                     onQuantityChange,
                                                 }: ProductQuantityComponentProps) {
    const [count, setCount] = useState(1)

    const handlePlus = () => {
        const next = count + 1
        setCount(next)
        onQuantityChange(next)
    }

    const handleMinus = () => {
        if (count > 1) {
            const next = count - 1
            setCount(next)
            onQuantityChange(next)
        }
    }

    return (
        <div className="flex gap-4 items-center">
            <button onClick={handleMinus}>
                <FaMinus />
            </button>
            <span className="font-bold">{count}</span>
            <button onClick={handlePlus}>
                <FaPlus />
            </button>
        </div>
    )
}
