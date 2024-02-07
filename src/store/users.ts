import {create} from 'zustand';

interface User
{
    username: string;
    password: string;
}

interface users_data_store
{
    users: User[];
    newUser(data: User): void;
}

export const useUserDataStore = create<users_data_store>(set => ({
    users: ['juan', 'jeremias', 'jose', 'jaime'].map((username) => ({username, password: 'password'})),
    newUser(new_user)
    {
        set(state => ({users: [...state.users, new_user]}))
    }
}));

export const authenticate = ({username, password}: User) => {
    const users = useUserDataStore(state => state.users);
    for (const user of users)
        if (user.username == username && user.password == password)
            return (true);
    return (false);
}