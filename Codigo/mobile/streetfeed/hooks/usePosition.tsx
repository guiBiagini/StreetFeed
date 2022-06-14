import { LocationObjectCoords, getCurrentPositionAsync } from "expo-location";
import { useEffect, useState } from "react";

export function usePosition() {
    const [coords, setCoords] = useState<LocationObjectCoords>();
    useEffect(() => {
        getCurrentPositionAsync().then((pos) => {
            setCoords(pos.coords);
        })
    }, []);

    return coords;
}