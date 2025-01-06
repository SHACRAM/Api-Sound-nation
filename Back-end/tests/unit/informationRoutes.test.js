import { vi, describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../app';
const jwt = require('jsonwebtoken');
import FormData, { from } from 'form-data';
import exp from 'constants';
const mysqlClient = require('../../Config/dbConfig');
vi.mock('../Config/dbConfig');

// Fichier de test pour les routes de la table information
const generateToken = () => {
    const payload = { id: 1, email: 'test@example.com' }; 
    const secret = 'secretKey'; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign(payload, secret, options);
  };

//   TESTS unitaires pour la route Post /addFaq

describe('POST /addFaq', ()=>{
    it('Sould return 201 status code and a confirmation message', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);
        const response = await request(app)
        .post('/api/informations/addFaq')
        .set('Cookie', [`auth_token=${token}`])
        .send({
            question: 'test question',
            reponse: 'test answer',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('La question / réponse a bien été ajoutée');
    })

    it('Should return a 400 status code and an error message if a question or a response is missing', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);
        const response = await request(app)
            .post('/api/informations/addFaq')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                question: 'test question'
            });

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})

// TESTS unitaires pour la route Get /faq
describe('GET /faq', ()=>{
    it('Should return a 200 status code and an array ok all questions and answers', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([[{question: 'test question', reponse: 'test answer'}]]);

        const response = await request(app)
        .get('/api/informations/faq')
        .set('Cookie', [`auth_token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Array);
    })

    it('Should return a 401 status code if there is no valide token', async ()=>{
        const response = await request(app)
        .get('/api/informations/faq');

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
    })
})

// TESTS unitaires pour la route post /modifyFaq
describe('POST /modifyFaq', ()=>{
    it('Should return a 200 status code and an confirmation message', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/modifyFaq')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                question : 'test',
                reponse: 'test',
                id : 1
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('La question / réponse a bien été modifiée');
    })

    it('Should return a 400 status code and an error message if id or question or response is missing', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/modifyFaq')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                question : 'test',
                reponse: 'test',
            })

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})

// TESTS unitaires pour la route delete /deleteFaq
describe('POST /deleteFaq', ()=>{
    it('Should return a 200 status code and a confirmation message', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/deleteFaq')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                id: 1
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('La question / réponse a bien été supprimée');
    })

    it('Should return a 400 status code and an error message', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/deleteFaq')
            .set('Cookie', [`auth_token=${token}`])
            .send({
               
            })

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de renseigner un id');
    })
})

// TESTS unitaires pour la route post /addInfoPratique
describe('POST /addInfoPratique', ()=>{
    it('Should return a 201 status code and a confirmation message', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/addInfoPratique')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                information: 'test'
            })


        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('L\'information pratique a bien été ajoutée');
    })

    it('Should return a 400 status code and an error message if title or information is missing', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/addInfoPratique')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
            })


        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})

// TESTS unitaires pour la route get /infoPratique
describe('GET /getInfoPratique', ()=>{
    it('Should return a 200 status code and an array of all practical information', async ()=>{
        const token = generateToken();

        mysqlClient.query = vi.fn().mockResolvedValue([[{title: 'test', information: 'test'}]]);

        const response = await request(app)
            .get('/api/informations/getInfoPratique')
            .set('Cookie', [`auth_token=${token}`])

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data).toMatchObject([{title: expect.any(String), information: expect.any(String)}]);
    })


    it('Should return a 401 status code if there is no valide token', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{title: 'test', information: 'test'}]]);

        const response = await request(app)
            .get('/api/informations/getInfoPratique')
            

        expect(response.status).toBe(401);
    })
})

// TESTS unitaires pour la route post /modifyInfoPratique
describe('POST /modifyInfoPratique', ()=>{
    it('Should return a 200 status code and a confirmation message', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/modifyInfoPratique')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                information: 'test',
                id: 1
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('L\'information pratique a bien été modifiée');
    })

    it('Should return a 400 status code and an error message if a field is missing', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/modifyInfoPratique')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                id: 1
            })

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})

// TESTS unitaires pour la route post /deleteInfoPratique
describe('POST /deleteInfoPratique', ()=>{
    it('Should return a 200 status code and a confirmation message', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/deleteInfoPratique')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                id: 1
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('L\'information pratique a bien été supprimée');
    })

    it('Should return a 400 status code and an error message if id is missing', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/deleteInfoPratique')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                
            })

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de renseigner un id');
    })
})

// TESTS unitaires de la route post /addCguCookie
describe('POST /addCguCookie permet dajouter des CGU, Cookies ou données personnelles', ()=>{
    it('Should return a 201 status code and a confirmation message if datas are inserted in the database and the category === cgu', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/addCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                content: 'test',
                cat: 'cgu'
            })

        expect (response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('La cgu a bien été ajoutée');
    })

    it('Should return a 201 status code and a confirmation message if datas are inserted in the database and the category === cookie', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/addCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                content: 'test',
                cat: 'cookie'
            })

        expect (response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le cookie a bien été ajouté');
    })

    it('Should return a 400 status code and an error message if one or more fields are missing', async ()=>{
        const token = generateToken();
        // mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/addCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                cat: 'cgu'
            })

        expect (response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})

// TESTS unitaires de la route get /getCguCookie
describe('GET /getCguCookie permet de récupérer les CGU, Cookies ou données personnelles', ()=>{
    it('Should return a 200 status code and an array of all CGU, Cookies and personal datas', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([[{title: 'test', content: 'test', category: 'cgu'}]]);

        const response = await request(app)
            .get('/api/informations/getCguCookie')
            .set('Cookie', [`auth_token=${token}`])

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data).toMatchObject([{title: expect.any(String), content: expect.any(String), category: expect.any(String)}]);

    })

    it('Should return a 401 status code if there is no valide token', async ()=>{
        const response = await request(app)
            .get('/api/informations/getCguCookie')

        expect(response.status).toBe(401);
    })
})

// TESTS unitaires de la route post /deleteCguCookie
describe('POST /deleteCguCookie permet de supprimer des CGU, Cookies ou données personnelles', ()=>{
    it('Should return a 200 status code and a confirmation message if the data has been deleted and if the category === cgu', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/deleteCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                id: 1,
                cat: 'cgu'
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('La CGU à été supprimée');
    })

    it('Should return a 200 status code and a confirmation message if the data has been deleted and if the category === pData', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/informations/deleteCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                id: 1,
                cat: 'pData'
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('La donnée personnelle à bien été supprimé');
    })

    it('Should return a 400 status code if one or more fields are missing', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/deleteCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                id: 1
            })

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})

// TESTS uitaires de la route post /modifyCguCookie
describe('POST /modifyCguCookie permet de modifier des CGU, Cookies ou données personnelles', ()=>{
    it('Should return a 200 status code and a confirmation message if the data has been modified and if the category === cgu', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/modifyCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                content: 'test',
                id: 1,
                cat: 'cgu'
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('La CGU a bien été modifiée');
    })

    it('Should return a 200 status code and a confirmation message if the data has been modified and if the category === cookie', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/modifyCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                content: 'test',
                id: 1,
                cat: 'cookie'
            })

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le cookie a bien été modifié');
    })

    it('Should return a 400 status code if one or more fields are missing', async ()=>{
        const token = generateToken();

        const response = await request(app)
            .post('/api/informations/modifyCguCookie')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                title: 'test',
                id: 1,
                cat: 'cgu'
            })
        
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Merci de remplir tous les champs');
    })
})
