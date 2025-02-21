import mitt from "mitt";
import { createContext, useContext } from "react";

export const EventsContext = createContext(mitt());
EventsContext.displayName = "EventsContext";

export function useEvents() {
    return useContext(EventsContext);
}
