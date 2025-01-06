import { vi, describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../app';
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
import FormData, { from } from 'form-data';
import exp from 'constants';
const mysqlClient = require('../../Config/dbConfig');
vi.mock('../Config/dbConfig');


// Fichier de test pour les routes de la table authentication
const generateToken = () => {
    const payload = { id: 1, email: 'test@example.com' }; 
    const secret = 'secretKey'; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign(payload, secret, options);
  };

//   TESTS initaires de la route /signin

describe('POST /signin for login to access to back office or account for the front', ()=>{
    it('Should return 200 status code and a token if the user is in the database and he has admin role', async ()=>{
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        mysqlClient.query = vi.fn().mockResolvedValue([[{user_email: 'test', user_password: 'hashedPassword', user_role: 'admin'}]]);
        const response = await request(app)
        .post('/api/authentication/signin')
        .send({email: 'test',
            password: 'test',
            backndConnect: true
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Connexion réussie');
    })

    it('Should return 401 status code and an error message if the user is not find in the database', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[]]);
        const response = await request(app)
        .post('/api/authentication/signin')
        .send({email: 'test',
            password: 'test',
            backEndConnect: true
        });

        expect(response.statusCode).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Erreur, merci de vérifier vos identifiants');
       
    })

    it('Should return 403 status code and an error message if the user doesn\'t match\t have permission', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{user_email: 'test@test.com', user_password: 'hashedPassword', user_name: 'test', user_role: 'user'}]]);
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        const response = await request(app)
        .post('/api/authentication/signin')
        .send({email: 'test@test.com',
            password: 'test',
            backEndConnect: true
        });

        expect(response.statusCode).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Vous n\'avez pas les droits pour accéder à cette page');
       
    })


    it('Should return 401 status code and an error message if the password doesn\'t match', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{user_email: 'test@test.com', user_password: 'hashedPassword', user_name: 'test', user_role: 'admin'}]]);
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(false);
        const response = await request(app)
        .post('/api/authentication/signin')
        .send({email: 'test@test.com',
            password: 'test',
            backEndConnect: true
        });

        expect(response.statusCode).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Mot de passe incorrect');
       
    })
})

// TESTS initaires de la route /verify-auth
describe('GET /verify-auth to verify if the user is connected', ()=>{
    it('Should return 200 status code if the user is connected', async ()=>{
        const token = generateToken();

        const response = await request(app)
        .get('/api/authentication/verify-auth')
        .set('Cookie', `auth_token=${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
    })
})

// TESTS initaires de la route /logOut qui permet de se déconnecter
describe('GET /logOut to log out', ()=>{
    it('Should return 200 status code if the user is disconnected', async ()=>{
        const response = await request(app)
        .get('/api/authentication/logOut');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
    })
})

// TESTS unitaires pour la modification du mot de passe de l'utilisateur
describe('PUT /:email to modify the password of the user', ()=>{
    it('Should return 200 status code and a confirmation message if the password is modified', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        const response = await request(app)
            .put('/api/authentication/test@test.com')
            .set('Cookie', `auth_token=${token}`)
            .send({password: 'testNewPassword'});

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Votre mot de passe a été modifié avec succès');
    })

    it('Should return 400 status code and an error message if the password length is under 8 characters ', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(false);

        const response = await request(app)
            .put('/api/authentication/test@test.com')
            .set('Cookie', `auth_token=${token}`)
            .send({password: 'test'});

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Le mot de passe doit contenir au moins 8 caractères');
    })

    it('Should return 400 status code and an error message if one field or more are missing ', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(false);

        const response = await request(app)
            .put('/api/authentication/test@test.com')
            .set('Cookie', `auth_token=${token}`)
            .send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Veuillez renseigner tous les champs');
    })
})

