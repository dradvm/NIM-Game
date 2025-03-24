import { memo } from "react"

export default memo(function MenuButton({ image, title, subTitle, marginClass = "mt-0", ...props }) {

    return (
        <div
            {...props}
            className={`hover:-translate-y-1 active:-translate-y-0.5 select-none cursor-pointer ease-out duration-100 flex items-center ${marginClass} bg-neutral-950 hover:bg-neutral-900 rounded px-6 py-4 shadow-[0_0_0.8rem_transparent,0_0_1.6rem_transparent,inset_0_-0.8rem_2.4rem_transparent,inset_0_-0.2rem_0_0_black]`}>
            <div className="w-14">
                <img src={image} className="w-full" alt="shape" />
            </div>
            <div className={`w-72 flex flex-col ms-6 text-white`}>
                <div className="text-2xl font-medium">{title}</div>
                <div className="mt-1">{subTitle}</div>
            </div>
        </div>
    )
})
