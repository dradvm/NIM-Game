import { memo } from "react";

export default memo(function MenuTemplate({ children }) {
    return (
        <div className="fixed relative h-full w-full flex justify-around items-center bg-gray-900">
            {children}
        </div>
    )
})