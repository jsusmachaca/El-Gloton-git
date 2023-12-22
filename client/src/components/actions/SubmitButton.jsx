import React from "react";

export const SubmitButton = (props) => {
    return (
        <div className="mt-8">
            <button type="submit" className="bg-gray-700 text-white font-medium py-2 px-4 w-full rounded hover:bg-gray-600">{props.text}</button>
        </div>
    )
}