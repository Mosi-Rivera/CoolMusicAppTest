import { redirect } from "react-router-dom"
import { useUserDataStore } from "../store/user_data";

export default (onAuthenticated: ((code: string) => void) | void) => {
    return async () => {
        const {authenticated} = useUserDataStore.getState();
        if (!authenticated)
        {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            if (!code)
                return redirect('/');
            document.getElementById('root')?.classList.add('authenticated');
            if (onAuthenticated)
            {
                return await onAuthenticated(code);
            }
        }
        return (null);
    }
};