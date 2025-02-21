import { useTheme } from "@mui/material";
import { useLayoutEffect, useState } from "react";

export function useMobile(defaultValue: boolean = false) {
    const { breakpoints } = useTheme();
    const [ mobile, setMobile ] = useState(defaultValue);

    const breakpoint = breakpoints.down("sm").replace("@media ", "");

    useLayoutEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
        function handleResize() {
            const { matches: next } = window.matchMedia(breakpoint);

            setMobile(next);
        }
    }, [ breakpoint ]);

    return mobile;
}