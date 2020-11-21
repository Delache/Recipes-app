import PouchDB from 'pouchdb'
import { Urls } from './environments/urls'
const urljoin = require('url-join')

export let localdb: PouchDB.Database<{}>
export let remotedb: PouchDB.Database<{}>
export let familydb: string

const SetData = (id: string) => {
    localdb = new PouchDB(id)
    remotedb = new PouchDB(urljoin(Urls.db, id))
    familydb = id
}

// TODO ResetData

export default SetData