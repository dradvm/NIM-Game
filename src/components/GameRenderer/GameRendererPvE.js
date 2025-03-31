import { memo, useContext, useEffect, useMemo } from "react";

import Screen from "@constants/screen";
import GameRoomPvE from "@components/GameRoom/GameRoomPvE";
import GameContext from "@components/Context/GameContext";
import MenuModePvE from "../Menu/MenuModePvE";
export default memo(function GameRendererPvE() {
    const { screen } = useContext(GameContext)

    const content = useMemo(() => {
        switch (screen) {
            case Screen.menuPvE:
                return <MenuModePvE />
            case Screen.gamePvE:
                return <GameRoomPvE />
            default:
                return <></>
        }
    }, [screen])


    return (
        <>
            {content}
        </>
    )
})