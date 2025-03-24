import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react"
import MenuTemplate from "./MenuTemplate"
import botImage from "@assets/bot.png"
import Bot from "@constants/bot"
import { GameContext } from "@/App"
import Screen from "@constants/screen"
import Player from "@constants/player"
export default memo(function MenuModePvE() {

    const { botMode, setBotMode, setWinMode, setIsFirstPlayer, setScreen, setLevelMode } = useContext(GameContext)



    const numberOfBot = useMemo(() => Bot.length, [])
    const [botSelected, setBotSelected] = useState(botMode)

    const [winCondition, setWinCondition] = useState(false)
    const [firstPlay, setFirstPlay] = useState(false)

    const handleWinCondition = (event) => {
        setWinCondition(event.target.checked);
    };
    const handleFirstPlay = (event) => {
        setFirstPlay(event.target.checked)
    }

    const playGame = useCallback(() => {
        setBotMode(botSelected)
        setLevelMode(botSelected.level)
        setWinMode(!winCondition)
        setIsFirstPlayer(!firstPlay)
        setScreen(Screen.gamePvE)
    })

    return (
        <MenuTemplate>
            <div className="bg-gray-600 rounded flex flex-col overflow-hidden" style={{ width: "400px" }}>
                <div className="bg-gray-950 text-white py-3 flex items-center justify-center">
                    <div className="flex items-center">
                        <div className="w-10">
                            <img src={botImage} className="w-full" alt="shape" />
                        </div>
                        <div className="ms-4 font-medium text-xl">
                            Chơi với máy
                        </div>
                    </div>
                </div>
                <div className="px-6 pt-10 pb-6 ">
                    <div className="w-16 h-20">
                        <img src={botSelected.image} className="w-full" alt="shape" />
                    </div>
                    <div className="flex flex-col mt-4">
                        <div className="flex items-center justify-between">
                            <div className="text-white text-lg font-medium">
                                {botSelected.name}
                            </div>
                            <div className="text-sm ms-3 text-slate-300">
                                {botSelected.level.title}
                            </div>
                        </div>
                        <div className="text-slate-200 mt-2 text-sm">
                            {botSelected.description}
                        </div>
                    </div>
                    <div className="rounded bg-gray-500 px-3 py-2 mt-5">
                        <div className="flex justify-between items-center">
                            <div className=" font-medium text-white">
                                Squid Game
                            </div>
                            <div className="text-sm text-slate-300">
                                {numberOfBot} bot
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3">
                            {Bot.map((bot) => (
                                <div className={`rounded bg-white h-16 p-1 cursor-pointer ${bot === botSelected && "border-2 border-gray-800"}`} onClick={() => setBotSelected(bot)} >
                                    <img src={bot.image} className="w-full h-full" alt="shape" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-slate-200 text-sm">Người chơi cuối cùng {!winCondition ? "thắng" : "thua"}</div>
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value={winCondition} onChange={handleWinCondition} className="sr-only peer" />
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800 dark:peer-checked:bg-gray-800"></div>

                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between ">
                        <div className="text-slate-200 text-sm">{!firstPlay ? "Người chơi" : "Máy"} chơi trước </div>
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value={firstPlay} onChange={handleFirstPlay} className="sr-only peer" />
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800 dark:peer-checked:bg-gray-800"></div>

                            </label>
                        </div>
                    </div>
                    <div
                        onClick={playGame}
                        className={`text-2xl font-medium text-white hover:-translate-y-1 active:-translate-y-0.5 select-none cursor-pointer ease-out duration-100 flex items-center justify-around mt-5 bg-neutral-950 hover:bg-neutral-900 rounded px-6 py-4 shadow-[0_0_0.8rem_transparent,0_0_1.6rem_transparent,inset_0_-0.8rem_2.4rem_transparent,inset_0_-0.2rem_0_0_black]`}>

                        Play
                    </div>
                </div>
            </div>
        </MenuTemplate>
    )
})