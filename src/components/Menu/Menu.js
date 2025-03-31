import { memo, useContext } from "react"
import MenuButton from "./MenuButton"

import shape from "@assets/shape.png"
import bot from "@assets/bot.png"
import Screen from "@constants/screen"
import MenuTemplate from "./MenuTemplate"
import Game from "@constants/game"
import GameContext from "../Context/GameContext"

export default memo(function Menu() {

    const { setScreen, setGameMode } = useContext(GameContext)

    const handleSelectMenuPvP = () => {
        setGameMode(Game.gamePvP)
        setScreen(Screen.menuPvP)
    }

    const handleSelectMenuPvE = () => {
        setGameMode(Game.gamePvE)
        setScreen(Screen.menuPvE)
    }
    return (
        <MenuTemplate>
            <div className="">
                <MenuButton
                    image={shape}
                    title={"Chơi trực tuyến"}
                    subTitle={"Chơi với mọi người trên thế giới"}
                    onClick={handleSelectMenuPvP}
                />
                <MenuButton
                    image={bot}
                    title={"Chơi với máy"}
                    subTitle={"Chơi với máy có thể tùy chỉnh"}
                    marginClass={"mt-4"}
                    onClick={handleSelectMenuPvE}
                />
            </div>
        </MenuTemplate>
    )
})