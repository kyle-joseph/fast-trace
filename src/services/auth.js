import { auth } from "./firebase"

export function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}

export function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}