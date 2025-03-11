import User from "../models/User";

export const getUserById = async (id: string) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return null;
    }
};