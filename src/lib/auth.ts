/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import Buffer from "buffer";
import pkg from 'text-encoding';
const {TextDecoder, TextEncoder} = pkg;
global.Buffer = global.Buffer || Buffer.Buffer;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import GUN from "gun"
import "gun/axe"
import "gun/sea"

export const db = browser ? new GUN({ peers: ["https://gun-manhattan.herokuapp.com/gun", "https://peer.wallie.io/gun", "https://gundb-relay-mlccl.ondigitalocean.app/gun"] }) : global.db;
export const user = browser ? db?.user().recall({sessionStorage: true}) : global.user;

export const username = writable('');
export const email = writable('');
let favoredinit: string[] = [];
export const favored = writable(favoredinit);

user?.get('alias').on((v:string) => username.set(v))
user?.get('email').on((v:string) => email.set(v))
user?.get('favored').on((v:string) => favored.set(JSON.parse(v)))

db?.on('auth', async() => {
    const readUsername = await user.get('alias');
    const readEmail = await user.get('email');
    const readFavored = await user.get('favored');
    username.set(readUsername)
    email.set(readEmail)
    favored.set(JSON.parse(readFavored))
})

export async function login(username:string, password:string):Promise<void> {
    return new Promise((resolve, reject) => {
        user.auth(username, password, (ack:any) => {
            if (ack.err) reject(ack.err)
            else resolve()
        })
    })
}

export function register(username:string, password:string, email:string):Promise<void> {
    return new Promise((resolve, reject) => {
        registerHelper(username, password).then(() => {
            login(username, password).then(() => {
                user.get('email').put(email)
                resolve()
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
}

function registerHelper(username:string, password:string):Promise<void> {
    return new Promise((resolve, reject) => {
        user.create(username, password, (ack:any) => {
            if (ack.err) reject(ack.err)
            else resolve()
        })
    })
}

export function logout():Promise<void> {
    username.set('')
    email.set('')
    return new Promise((resolve, reject) => {
        user.leave((ack:any) => {
            if (ack.err) reject(ack.err)
            else resolve()
        })
    })
}

export function favor(room:string):Promise<void> {
    return new Promise((resolve, reject) => {
        favored.update(f => {
            f.push(room)
            return f
        })
        user.get("favored").put(JSON.stringify(favored))
        resolve()
    })
}

export function unFavor(room:string):Promise<void> {
    return new Promise((resolve, reject) => {
        favored.update(f => {
            const index = f.indexOf(room, 0);
            if (index > -1) {
                f.splice(index, 1);
            }
            return f
        })
        user.get("favored").put(JSON.stringify(favored))
        resolve()
    })
}