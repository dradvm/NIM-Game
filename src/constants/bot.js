
import trianglePinkMan from "@assets/TrianglePinkMan.png"
import squarePinkMan from "@assets/SquarePinkMan.png"
import circlePinkMan from "@assets/CirclePinkMan.png"
import maskMan from "@assets/MaskMan.png"
import Level from "./level"

const Bot = [
    {
        name: "Circle Man",
        image: circlePinkMan,
        description: "Đừng để vẻ ngoài hiền lành đánh lừa, chúng tôi luôn có mặt ở khắp nơi, theo dõi từng bước chân của bạn.",
        level: Level.easy
    },
    {
        name: "Square Man",
        image: squarePinkMan,
        description: "Không có lối thoát đâu, tôi kiểm soát mọi thứ và ra lệnh cho binh lính truy đuổi bạn đến cùng.",
        level: Level.normal
    },
    {
        name: "Triangle Man",
        image: trianglePinkMan,
        description: "Sẵn sàng hay chưa? Tôi là kẻ chặn đường bạn, nhanh, chính xác và không bao giờ bỏ lỡ mục tiêu.",
        level: Level.hard
    },
    {
        name: "Mask Man",
        image: maskMan,
        description: "Bạn chỉ là một con tốt trong bàn cờ của tôi. Mọi nước đi đã được sắp đặt, và kết cục của bạn cũng vậy.",
        level: Level.expert
    },]
export default Bot