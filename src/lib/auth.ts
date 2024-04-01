/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import Gun from "gun"
import "gun/sea"
import "gun/axe"

export const db = new Gun(['http://localhost:8765/gun', 'https://anoasked-git-dev-simon-masooglus-projects.vercel.app/gun', 'https://anoasked.vercel.app/gun']);
export const user = db.user().recall({sessionStorage: true}); 

export const username = writable('');

user.get('alias').on((v:string) => username.set(v))

db.on('auth', async() => {
    const alias = await user.get('alias');
    username.set(alias)
})

export async function login(username:string, password:string):Promise<void> {
    return new Promise((resolve, reject) => {
        user.auth(username, password, (ack:any) => {
            if (ack.err) reject(ack.err)
            else resolve()
        })
    })
}

export function register(username:string, password:string):Promise<void> {
    return new Promise((resolve, reject) => {
        user.create(username, password, (ack:any) => {
            if (ack.err) reject(ack.err)
            else resolve()
        })
    })
}

export function logout():Promise<void> {
    username.set('')
    return new Promise((resolve, reject) => {
        user.leave((ack:any) => {
            if (ack.err) reject(ack.err)
            else resolve()
        })
    })
}