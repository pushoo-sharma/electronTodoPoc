import PouchDB from 'pouchdb';

export default class DB {
    constructor(name) {
        this.db = new PouchDB('react-notes');
    }

    async getAllNotes() {
        // this.db.info().then(function (info) {
        //     console.log(info.db_name);
        // })
        let allNotes = await this.db.allDocs({ include_docs: true });
        let notes = {};

        allNotes.rows.forEach(n => notes[n.id] = n.doc);

        return notes;
    }

    async createNote(note) {
        note.createdAt = new Date();
        note.updatedAt = new Date();

        const res = await this.db.post({ ...note });

        return res;
    }

    async updateNote(note) {
        note.updatedAt = new Date();

        const res = await this.db.put({ ...note });
        return res;
    }

    async deleteNote(note) {
        await this.db.remove(note);
    }
}
