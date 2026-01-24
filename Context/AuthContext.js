import { createContext , useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){

    const [user , setUser] = useState(null)

    const [sessionToken , setSessionToken] = useState(null)

    

    return(

        <AuthContext.Provider value={ {user , setUser , sessionToken , setSessionToken}}>

            {children}
            
        </AuthContext.Provider>
    )

}