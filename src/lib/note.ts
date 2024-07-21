import db from "./db";

export const createNote = async (title: string, content: string, author: string, visibility: boolean, category: string) => {
    try {
        const note = await db.collection("notes").create({
            "title": title,
            "content": content,
            "author": author,
            "visibility": visibility,
            "category": category
        });
        return note;
    } catch (error) {
        throw error;
    }
}

export const updateNote = async (id: string, title: string, content: string, visibility: boolean, category: string) => {
    try {
        const note = await db.collection("notes").update(id, {
            "title": title,
            "content": content,
            "visibility": visibility,
            "category": category
        });
        return note;
    } catch (error) {
        throw error;
    }
}

export const deleteNote = async (id: string) => {
    try {
        const note = await db.collection("notes").delete(id);
        return note;
    } catch (error) {
        throw error;
    }
}