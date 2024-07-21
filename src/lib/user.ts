import db from "./db";

export const createUser = async (name: string, username: string, password: string, passwordConfirm: string, email: string, emailVisibility: boolean, subscriptionPlan: string) => {
    try {
        if (password !== passwordConfirm) {
            throw new Error("Passwords do not match");
        } else {
            const user = await db.collection("users").create({
                "username": username,
                "name": name,
                "email": email,
                "emailVisibility": emailVisibility,
                "password": password,
                "passwordConfirm": passwordConfirm,
                "subscriptionPlan": subscriptionPlan
            });
            return user;
        }
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (username: string, password: string) => {
    try {
        const user = await db.collection("users").authWithPassword(username, password);
        return user;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        await db.authStore.clear();
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (name: string, username: string, password: string, passwordConfirm: string, oldPassword: string, emailVisibility: boolean) => {
    try {
        if (password !== passwordConfirm) {
            throw new Error("Passwords do not match");
        } else {
            const user = await db.collection("users").update(username, {
                "username": username,
                "name": name,
                "emailVisibility": emailVisibility,
                "password": password,
                "passwordConfirm": passwordConfirm,
                "oldPassword": oldPassword
            });
            return user;
        }
    } catch (error) {
        throw error;
    }
}