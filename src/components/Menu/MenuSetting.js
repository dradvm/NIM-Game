import { memo, useCallback, useContext, useState } from "react";
import { GameContext } from "../../App";
import Screen from "@constants/screen"
// const { ipcRenderer } = window.require('electron');


export default memo(function MenuSetting({ setIsEscape }) {
    const { setScreen, socketRef, stopAudioRef, setVolume, volume } = useContext(GameContext)

    const backToMenu = useCallback(() => {
        socketRef.current.emit("quitRoom")
        stopAudioRef.current?.()
        setScreen(Screen.menu)
    }, [stopAudioRef])

    const quitGame = useCallback(() => {
        // ipcRenderer.send('close-app', [])
    })

    return (
        <div className="z-10 fixed absolute h-full w-full flex justify-around items-center ">

            <div className="bg-gray-900 absolute h-full w-full opacity-85" onClick={() => setIsEscape(false)}>
            </div>
            <div className="mt-5 z-20">
                <div className="bg-gray-950 flex items-center justify-around py-3 font-medium">
                    <div className="text-white text-lg text-center">Cài Đặt</div>
                </div>
                <div className="bg-gray-700 flex flex-col items-center px-4 py-5 flex">
                    <div className="flex items-center">
                        <div className="font-medium text-white me-5">
                            Âm Nhạc
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="w-48 h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-gray-950"
                        />
                    </div>
                    <div
                        onClick={() => {
                            backToMenu()
                        }}
                        className={`w-full font-medium text-white hover:-translate-y-1 active:-translate-y-0.5 select-none cursor-pointer ease-out duration-100 flex items-center justify-around mt-5 bg-neutral-950 hover:bg-neutral-900 rounded px-6 py-3 shadow-[0_0_0.8rem_transparent,0_0_1.6rem_transparent,inset_0_-0.8rem_2.4rem_transparent,inset_0_-0.2rem_0_0_black]`}>
                        Trở về màn hình chính
                    </div>
                    <div
                        onClick={quitGame}
                        className={`w-full font-medium text-white hover:-translate-y-1 active:-translate-y-0.5 select-none cursor-pointer ease-out duration-100 flex items-center justify-around mt-3 bg-neutral-950 hover:bg-neutral-900 rounded px-6 py-3 shadow-[0_0_0.8rem_transparent,0_0_1.6rem_transparent,inset_0_-0.8rem_2.4rem_transparent,inset_0_-0.2rem_0_0_black]`}>
                        Thoát trò chơi
                    </div>
                </div>
            </div>
        </div>
    )
})