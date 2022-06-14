import { useRef } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";

export type EnumRoutes = "map" | "profile" | "feedback" | `feedback/${number}`
interface IRoutesCotext{
    navigate: ( route: EnumRoutes ) => void,
    goBack: () => void,
    route: EnumRoutes
}
const routesContext = createContext<IRoutesCotext>({
    navigate(route) {},
    goBack() {},
    route: "map"
})

interface IRoutesProps{
    children: ( route: EnumRoutes ) => React.ReactNode
}

export function Router(props: IRoutesProps){

    const [ route, setRoute ] = useState<EnumRoutes>("map");
    const stackRef = useRef<Array<EnumRoutes>>(["map"]);

    const navigate = useCallback((route: EnumRoutes)=>{
        stackRef.current.push(route);
        setRoute(route);
    }, []);

    const goBack = useCallback(()=>{
        if (stackRef.current.length > 1){
            stackRef.current.pop();
            const newRoute = stackRef.current[ stackRef.current.length - 1 ];
            setRoute(newRoute);
        }
    }, [])

    return (
        <routesContext.Provider
            value={{
                navigate,
                goBack,
                route
            }}
        >
            {props.children(route)}
        </routesContext.Provider>
    )
}

export function useRouter(){
    return useContext(routesContext);
}