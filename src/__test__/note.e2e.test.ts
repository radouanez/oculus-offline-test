import request from "supertest"

import application from "../infrastructure/application"
import { SIMPLE_TOKEN } from "./const"
const BASE_URL = '/api/v1/notes'
/**
 **********************************************************
 ********************* Setups ************************
 **********************************************************
 */

// beforeAll(() => {
//     console.log("Before all Tests")
// })

// beforeEach(() => {
//     console.log("Before each Test")
// })

// afterEach(() => {
//     console.log("After each Test")
// })

afterAll(() => {
    console.log("After all Tests")
})

/**
 **********************************************************
 ********************* Test suites ************************
 **********************************************************
 */

 describe('default app failure', () => {
    it('should fail, 404 not found', async () => {
        // arrange
        const url = '/api/falsyRoute'
        // act
        const res = await request(application).get(url).set('Authorization', 'Bearer ' + SIMPLE_TOKEN).send()
        // assert
        expect(res.status).toBe(404) 
        expect(typeof res.body).toBe('object') 
    })
})

describe('default app failure', () => {
    it('should fail, 404 not found', async () => {
        // arrange
        const url = '/api/falsyRoute'
        // act
        const res = await request(application).get(url).set('Authorization', 'Bearer ' + SIMPLE_TOKEN).send()
        // assert
        expect(res.status).toBe(404) 
        expect(typeof res.body).toBe('object') 
    })
})

describe('GET all notes', () => {

    it('should success, get all notes', async () => {
        // arrange
        const url = '/api/v1/notes'
        // act
        const res = await request(application).get(url).set('Authorization', 'Bearer ' + SIMPLE_TOKEN).send()
        // assert
        expect(res.status).toBe(200) 
        expect(typeof res.body).toBe('object') 
    })
})