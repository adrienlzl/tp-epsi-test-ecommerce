
'use client'
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

interface ProductQuantityComponentProps {
    onQuantityChange: (quantity: number) => void
    stock: number
}

export default function ProductQuantityComponent({
    onQuantityChange,
    stock,
}: ProductQuantityComponentProps) {
    const [count, setCount] = useState(1)

    const handlePlus = () => {
        if (count < stock) {
            const next = count + 1
            setCount(next)
            onQuantityChange(next)
        }
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
            <button
                onClick={handleMinus}
                disabled={count <= 1}
                className={`p-2 cursor-pointer border rounded ${
                count <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
            >
                <FaMinus />
            </button>
            <span className="font-bold">{count}</span>
            <button
                onClick={handlePlus}
                disabled={count >= stock}
                className={`p-2 cursor-pointer border rounded ${
                count >= stock ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
            >
                <FaPlus />
            </button>
        </div>
    )
}
