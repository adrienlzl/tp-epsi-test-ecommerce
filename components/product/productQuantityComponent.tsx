
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

    const updateCount = (newCount: number) => {
        const validCount = Math.max(1, Math.min(stock, newCount))
        setCount(validCount)
        onQuantityChange(validCount)
    }

    const handlePlus = () => updateCount(count + 1)

    const handleMinus = () => updateCount(count - 1)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (!isNaN(value)) {
            updateCount(value)
        }
        else {
            setCount(1)
            onQuantityChange(1)
        }
    }

    const handleBlur = () => {
    // Si l'utilisateur vide l'input ou met une valeur invalide
        if (count < 1) {
            updateCount(1)
        }
        else if (count > stock) {
            updateCount(stock)
        }
    }

    return (
        <div className="flex gap-2 items-center">
            <button
                onClick={handleMinus}
                disabled={count <= 1}
                className={`p-2 border rounded w-8 h-8 flex items-center justify-center ${
                count <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
            >
                <FaMinus size={12} />
            </button>

            <input
                type="number"
                min={1}
                max={stock}
                value={count}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-16 text-center border rounded py-1 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
                onClick={handlePlus}
                disabled={count >= stock}
                className={`p-2 border rounded w-8 h-8 flex items-center justify-center ${
                count >= stock ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
            >
                <FaPlus size={12} />
            </button>
        </div>
    )
}
