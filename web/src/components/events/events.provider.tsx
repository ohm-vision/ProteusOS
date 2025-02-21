import mitt from "mitt";
import { EventsContext } from "./events.context";
import { useMemo, useState } from "react";

export function EventsProvider({ children }: React.PropsWithChildren) {
    const value = useMemo(mitt, []);

    return <EventsContext.Provider value={value}>
        {children}

    </EventsContext.Provider>

}