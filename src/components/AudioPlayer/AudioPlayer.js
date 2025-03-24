import useSound from "use-sound";
import mySound from "@assets/song.ogg";
import { memo, useContext, useEffect } from "react";
import { GameContext } from "../../App";

export default memo(function AudioPlayer() {
    const { stopAudioRef, volume } = useContext(GameContext)
    const [play, { stop }] = useSound(mySound, { volume: (volume / 100), loop: true });
    useEffect(() => {
        play(); // Tự động phát khi component được mount
        stopAudioRef.current = stop
    }, [play]);
    return <></>;
})
