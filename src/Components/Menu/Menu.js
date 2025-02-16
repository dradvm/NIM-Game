import { memo, useContext } from "react"
import MenuButton from "./MenuButton"

import shape from "@assets/shape.png"
import bot from "@assets/bot.png"
import Screen from "@constants/screen"
import MenuTemplate from "./MenuTemplate"
import { GameContext } from "@/App"

export default memo(function Menu() {

    const { setScreen } = useContext(GameContext)

    return (
        <MenuTemplate>
            <div className="">
                <MenuButton
                    image={shape}
                    title={"Chơi trực tuyến"}
                    subTitle={"Chơi với mọi người trên thế giới"}
                    onClick={() => setScreen(Screen.modePvP)}
                />
                <MenuButton
                    image={bot}
                    title={"Chơi với máy"}
                    subTitle={"Chơi với máy có thể tùy chỉnh"}
                    marginClass={"mt-4"}
                    onClick={() => setScreen(Screen.modePvE)}
                />
            </div>
        </MenuTemplate>
    )
})