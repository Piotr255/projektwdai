import {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
function AuthProvider({ children }) {
    const [isReg, setIsReg] = useState(() => {
        const savedIsReg = localStorage.getItem('isReg');
        return savedIsReg !== null ? JSON.parse(savedIsReg) : false;
    });
    const [isLog, setIsLog] = useState(() => {
        const savedIsLog = localStorage.getItem('isLog');
        return savedIsLog !== null ? JSON.parse(savedIsLog) : false;
    });

    const reg = () => setIsReg(true);
    const noreg = () => setIsReg(false);

    const log = () => setIsLog(true);
    const nolog = () => {
        setIsLog(false);
        setIsReg(false);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        localStorage.setItem('isLog', JSON.stringify(isLog));
    }, [isLog]);
    useEffect(() => {
        localStorage.setItem('isReg', JSON.stringify(isReg));
    }, [isReg]);
    return (
        <AuthContext.Provider value={{ isReg, reg, noreg, isLog, log, nolog}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider