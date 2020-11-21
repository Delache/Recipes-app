import store from './redux/store'
import { localdb, remotedb } from './databases'
import PouchDB from 'pouchdb'

var synchro: any
let pouchDbSyncActiveEvent = false
let pouchDbSyncChangeEvent = false

export const replication = () => {
    console.log('REPLICATION FUNCTION')
    if (synchro === undefined) {
        console.log('synchro is undefined')
        synchro = PouchDB.sync(localdb, remotedb, {
            live: true,
            retry: true
        }).on('change', function (info) {
            console.log('Changes Incoming !')
            pouchDbSyncChangeEvent = true
            console.log(info.change.docs[0])
        }).on('paused', function (err) {
            if(pouchDbSyncActiveEvent === true && pouchDbSyncChangeEvent === false){
            // replication paused (e.g. replication up to date, user went offline)
            //console.log('Replication paused !')
            }else{
                setInitStore()
            }
        }).on('active', function () {
            // replicate resumed (e.g. new changes replicating, user went back online)
            console.log('Replication active !')
            //setInitStore()
        }).on('denied', function (err) {
            // a document failed to replicate (e.g. due to permissions)
            console.log('Replication denied !')
        }).on('complete', function (info) {
            // handle complete
            console.log('Replication complete !')
            //setInitStore()
        }).on('error', function (err: any) {
            // handle error
            console.log('Replication error')
            console.log(err)
            synchro.cancel();
            synchro.removeAllListeners()
            synchro = undefined
            console.log('connection lost')
            if (err.error === 'unauthorized'){
                localStorage.removeItem('db')
                localStorage.removeItem('user')
                window.location.replace('/')
            } else {
                setTimeout(() => {
                    replication()
                }, 10000);
                setInitStore()
            }
        })
    } else {
        console.log('Synchro already running')
    }
    pouchDbSyncActiveEvent = false
    pouchDbSyncChangeEvent = false
}

const setInitStore = () => {
    console.log('INIT STORE')
    localdb.find({
        selector: {
            $or: [
                { type: { '$eq': 'user' } },
                { type: { '$eq': 'category' } },
                { type: { '$eq': 'recipe' } },
            ]
        }
    }).then((data: any) => { store.dispatch({ type: 'SET_ALL', data: data.docs }) })



}

