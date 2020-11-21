export class BaseData {
    localdb: PouchDB.Database<{}>
    remotedb: PouchDB.Database<{}>
    familyDB: string

    constructor(localdb: PouchDB.Database<{}>, remotedb: PouchDB.Database<{}>, familyDB: string){
        this.localdb = localdb
        this.remotedb = remotedb
        this.familyDB = familyDB
    }
}