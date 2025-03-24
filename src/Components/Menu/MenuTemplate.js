import { memo, useContext, useEffect } from "react";

import Screen from "@constants/screen"
import { GameContext } from "../../App";
export default memo(function MenuTemplate({ children }) {

    const { setScreen } = useContext(GameContext)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setScreen(Screen.menu)
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    return (
        <div className="fixed relative h-full w-full flex justify-around items-center bg-gray-900">
            {children}
        </div>
    )
})