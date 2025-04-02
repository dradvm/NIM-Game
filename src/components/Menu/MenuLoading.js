import { memo } from "react";
import MenuTemplate from "./MenuTemplate";

export default memo(function MenuLoading() {
    return (
        <MenuTemplate isPreventBackAction={true}>
            <div className="flex-column">
                <div className="border-slate-300 border-t-gray-700 h-20 w-20 animate-spin rounded-full border-4 " />
                <div className="text-white mt-3 text-lg font-medium">Đang Tải...</div>
            </div>
        </MenuTemplate>
    )
})