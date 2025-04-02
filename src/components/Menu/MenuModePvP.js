import { createContext, memo, useCallback, useContext, useEffect, useRef, useState } from "react"
import MenuTemplate from "./MenuTemplate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";
import Screen from "@constants/screen"
import Level from "@constants/level"
import SocketContext from "../Context/SocketContext";
import GameContext from "../Context/GameContext";



const Input = memo(function ({ maxLength, ...props }) {
    return (
        <input {...props} maxLength={maxLength} type="text" className="text-sm text-white px-3 py-2 rounded font-medium bg-gray-800 w-full" placeholder="" />

    )
})

export default memo(function MenuModePvP() {

    const [isChangeUsername, setIsChangeUsername] = useState(false)
    const [username, setUsername] = useState("")
    const [roomname, setRoomname] = useState("")
    const { setScreen, setIsFirstPlayer, setLevelMode } = useContext(GameContext)
    const { socketRef } = useContext(SocketContext)
    const [rooms, setRooms] = useState([])
    const [levelSelected, setLevelSelected] = useState(Object.values(Level)[0])

    const handleIsChangeUsername = useCallback((value) => {
        setIsChangeUsername(value)
    })

    const createRoom = useCallback(() => {
        socketRef.current.emit("createRoom", { username, roomname, level: levelSelected })
        setLevelMode(levelSelected)
    }, [socketRef, username, roomname, levelSelected, setLevelMode])


    const joinRoom = useCallback((roomId) => {
        socketRef.current.emit("joinRoom", { username, roomId })
    }, [socketRef, username])

    useEffect(() => {
        setUsername(socketRef.current.id)

        socketRef.current.emit("callLoadRooms")

        socketRef.current.on("loadRooms", (rooms) => {
            setRooms(rooms)
        })

        socketRef.current.on("joinedRoom", (data) => {
            setIsFirstPlayer(data.firstPlayer)
            setScreen(Screen.gamePvP)
            setLevelMode(data.level)
        })

        socketRef.current.on("roomDeleted", () => {
            setScreen(Screen.menuPvP)
        })



    }, [])

    return (
        <MenuTemplate>
            <div className="">
                <div className="flex justify-between">
                    <div className="flex flex-col me-24">

                        <div className="bg-gray-950 flex items-center py-3 font-medium">
                            <div className="text-white grow text-center">Danh Sách Phòng</div>
                        </div>
                        <div className="bg-gray-700 flex flex-col px-4 py-3">
                            <div className="mx-2 text-slate-400 font-medium text-sm flex items-center h-10">
                                <div className="w-16">
                                    ID
                                </div>
                                <div className="w-60">
                                    Phòng
                                </div>
                                <div className="w-24 text-center">
                                    Người chơi
                                </div>
                                <div className="w-24 text-center">
                                    Trạng thái
                                </div>
                            </div>
                            <div className="h-60 overflow-auto">
                                {rooms.length !== 0 ?
                                    rooms.map((room) => (
                                        <div key={room.id} className="mb-2 mx-2 font-medium text-sm flex items-center text-white">
                                            <div className="w-16">
                                                {room.id}
                                            </div>
                                            <div className="w-60">
                                                {room.name}
                                            </div>
                                            <div className="w-24 text-center">
                                                {room.clients.length}/{room.maxPlayer}
                                            </div>
                                            <div className="w-24 text-center">
                                                {room.state}
                                            </div>
                                            <div className="w-24">
                                                <div
                                                    onClick={() => room.clients.length < room.maxPlayer && joinRoom(room.id)}
                                                    className={`${room.clients.length === room.maxPlayer ? "bg-slate-400" : "cursor-pointer hover:bg-slate-100 active:bg-slate-200 bg-white"} text-base w-full rounded transition ease py-2  text-black text-center`}
                                                >
                                                    Tham gia
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="text-slate-400 w-full h-full flex items-center justify-around text-lg font-medium">
                                        Không có phòng
                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <div className="bg-gray-950 flex items-center justify-around py-3 font-medium">
                                <div className="text-white text-center">Tạo Phòng Mới</div>
                            </div>
                            <div className="bg-gray-700 flex flex-col px-4 py-3">
                                <div className="flex font-medium items-center h-10">
                                    <div className="text-white">
                                        Chơi như:
                                    </div>
                                    <div className="flex items-center justify-between ms-2 w-64">
                                        <div className="grow">
                                            {!isChangeUsername ?
                                                <div className="text-white">
                                                    <div className="text-sm">
                                                        {username}
                                                    </div>

                                                </div>
                                                :
                                                <Input maxLength={20} value={username} onChange={(e) => setUsername(e.target.value)} />
                                            }
                                        </div>
                                        <div className="ms-3">
                                            {!isChangeUsername ?
                                                <FontAwesomeIcon
                                                    onClick={() => handleIsChangeUsername(true)}
                                                    icon="fa-solid fa-square-pen"
                                                    className="text-white hover:text-slate-200 text-white cursor-pointer transition ease"
                                                />
                                                :
                                                <FontAwesomeIcon
                                                    onClick={() => handleIsChangeUsername(false)}
                                                    icon="fa-solid fa-square-check"
                                                    className="text-white hover:text-slate-200 text-white cursor-pointer transition ease"
                                                />
                                            }


                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Input maxLength={50} value={roomname} onChange={(e) => setRoomname(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="bg-gray-950 flex items-center justify-around py-3 font-medium">
                                <div className="text-white text-center">Số Hộp</div>
                            </div>
                            <div className="bg-gray-700 flex flex-col px-4 py-5">
                                <div className="grid grid-cols-4 gap-5">
                                    {Object.values(Level).map((level) => (
                                        <div key={level.numberGonggiBox} className={`font-custom flex items-center justify-around text-2xl rounded bg-white h-16  p-1 cursor-pointer ${level === levelSelected && "border-4 border-gray-950"}`} onClick={() => setLevelSelected(level)} >
                                            {level.numberGonggiBox}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={createRoom}
                            className={`font-medium text-white hover:-translate-y-1 active:-translate-y-0.5 select-none cursor-pointer ease-out duration-100 flex items-center justify-around mt-5 bg-neutral-950 hover:bg-neutral-900 rounded px-6 py-4 shadow-[0_0_0.8rem_transparent,0_0_1.6rem_transparent,inset_0_-0.8rem_2.4rem_transparent,inset_0_-0.2rem_0_0_black]`}>
                            Bắt Đầu
                        </div>
                    </div>
                </div>
            </div>
        </MenuTemplate>
    )
})
