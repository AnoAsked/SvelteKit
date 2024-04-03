/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import "gun/lib/mobile"
import Gun from "gun/gun"
import "gun/sea"

export const db = browser ? new Gun({ peers: [`http://${window.location.host}/gun`] }) : global.db;
export const user = browser ? db?.user().recall({sessionStorage: true}) : global.user; 

export const username = writable('');

user?.get('alias').on((v:string) => username.set(v))

db?.on('auth', async() => {
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