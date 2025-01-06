import { vi, describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../app';
const jwt = require('jsonwebtoken');
import FormData, { from } from 'form-data';
import exp from 'constants';
const mysqlClient = require('../../Config/dbConfig');
vi.mock('../Config/dbConfig');

// Fichier de test pour les routes de la table Users
const generateToken = () => {
    const payload = { id: 1, email: 'test@example.com' }; 
    const secret = 'secretKey'; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign(payload, secret, options);
  };


//   TESTS unitaires pour ajouter des utilisateurs en base de données
describe('POST /signup for add users in database', ()=>{
    it('Should return 201 status code and a message if the user is added in the database', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([{existingUser: 0}]);
        const response = await request(app)
            .post('/api/users/signup')
            .send({email: 'test',
                password: 'testPassword',
                identifiant: 'test',
                role: 'user'
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Votre compte a été créé avec succès');
    })

    it('Should return 400 status code and a message if the user password is less than 8 characters length ', async ()=>{
        const response = await request(app)
            .post('/api/users/signup')
            .send({email: 'test',
                password: 'test',
                identifiant: 'test',
                role: 'user'
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Le mot de passe doit contenir au moins 8 caractères');
    })

    it('Should return 400 status code and a message if fields are missing ', async ()=>{
        const response = await request(app)
            .post('/api/users/signup')
            .send({email: 'test',
                identifiant: 'test',
                role: 'user'
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Veuillez remplir tous les champs');
    })
    
    it('Should return 400 status code if user does already exist in database', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{existingUser: 1}]]);
        const response = await request(app)
            .post('/api/users/signup')
            .send({email: 'test',
                password: 'testPassword',
                identifiant: 'test',
                role: 'user'
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Vous possédez déjà un compte avec cet email');
    })     
})


// TESTS unitaires pour récupérer les informations d'un utilisateur en fonction de son adresse mail
describe('GET /information/:email for get user information by email', ()=>{
    it('Should return a 200 status code and an object with user information', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{result: 1}]]);
        const response = await request(app)
            .get('/api/users/information/:email')
            

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Object);
    })

    it('Should return a 400 status code and a message if the email is empty', async ()=>{
        const response = await request(app)
            .get('/api/users/information/%20')
            .send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Email invalide.');
    })

    it('Should return a 404 status code and a message if the user is not found', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[]]);
        const response = await request(app)
            .get('/api/users/information/nonExistEmail@unknow.com')
            .send();

        expect(response.statusCode).toBe(404);
    })
})

// TESTS unitaires pour la route de modification des informations d'un utilisateur
describe('POST /updateUser/:email for update user information', ()=>{
    it('Should return a 200 status code and message if the user informations are updated', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{rows: 1, updateResult: 1}]]);
        const response = await request(app)
            .post('/api/users/updateUser/:email')
            .send({userEmail: 'test@test.com', name:'test', email: 'testEmail@test.com'})
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Informations mises à jour avec succès');

    })

    it('Should return a 400 status code and an error message if the email does not exist', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[]]);
        const response = await request(app)
            .post('/api/users/updateUser/test@test.com')
            .send({ name: 'Test', email: 'new@test.com' });

        expect(response.statusCode).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Utilisateur non trouvé');
    })

    it('Should return a 400 status code and an error message if name or email is missing', async ()=>{
        const response = await request(app)
            .post('/api/users/updateUser/test@test.com')
            .send({name: 'test'})
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Veuillez remplir tous les champs');
    })
})

// TESTS unitaires pour la route d'ajout d'un groupe favoris à un utilisateur
describe('POST /favoris for add a favorite group to a user', ()=>{
    it('Should return a 201 status code and a message if the group is added to the user favorites', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn()
            .mockResolvedValue([[{existingFavoris: 0}]])
            .mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/users/favoris')
            .set('Cookie', [`auth_token=${token}`])
            .send({groupeId: 1, userEmail: 'test@test.com'})


        expect(response.statusCode).toBe(201);
    })

    it('Should return a 400 status code and an error message if fields are missing', async ()=>{
        const token = generateToken();
        const response = await request(app)
            .post('/api/users/favoris')
            .set('Cookie', [`auth_token=${token}`])
            .send({groupeId: 1})

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Veuillez remplir tous les champs');
    })

    it('Should return a 200 status code and a message if the groupe is already in the user favorites and remove from favorites ', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn()
            .mockResolvedValueOnce([[{existingFavoris: 1}]])
            .mockResolvedValueOnce([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/users/favoris')
            .set('Cookie', [`auth_token=${token}`])
            .send({groupeId: 2, userEmail: 'test@test.com'})

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Groupe supprimé des favoris');
    })
})

// TESTS unitaires pour la route de récupèration de la liste des favoris d'un utilisateur
describe('GET /favoris/:email for get user favorites list', ()=>{
    it('Should return a 200 status code and a list of user favorites', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValueOnce([[{result: 1}]]);

        const response = await request(app)
            .get('/api/users/favoris/test@test.com')
            .set('Cookie', [`auth_token=${token}`])
            
        
        expect(response.statusCode).toBe(200);
    })
})


// TESTS unitaires pour supprimer un utilisateur de la base de données
describe('DELETE /deleteAccount/:email for delete user account', ()=>{
    it('Should return a 200 status code ans a message if the user account is deleted', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValueOnce([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/users/deleteAccount/test@test.com')
            .set('Cookie', [`auth_token=${token}`])

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Le compte a été supprimé avec succès');
    })
})

// TESTS unitaires pour récupérer la liste des utilisateurs
describe('GET / for get all users', ()=>{
    it('Should return a 200 status code and a list of all users', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValueOnce([[{result: 1}]]);

        const response = await request(app)
            .get('/api/users/')
            .set('Cookie', [`auth_token=${token}`])


        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    })

    it('Should return a 404 status code and an error message if there is no users find', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValueOnce([{result: 0}]);

        const response = await request(app)
            .get('/api/users/')
            .set('Cookie', [`auth_token=${token}`])


        expect(response.statusCode).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
    })
})

// TESTS unitaires qui permet de modifier le role d'unutilisateur
describe('POST /modifyRole for modify user role', ()=>{
    it('Should return a 200 status code and a message if the user role is updated', async ()=>{
        const token = generateToken();

        mysqlClient.query = vi.fn().mockResolvedValueOnce([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/users/modifyRole')
            .set('Cookie', [`auth_token=${token}`])
            .send({
                newRole: 'admin',
                emailToModify: 'test@test.com'
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Le rôle a été modifié avec succès');
    })


    it('Should return a 400 status code and a message if fields are missing', async ()=>{
        const token = generateToken();

        mysqlClient.query = vi.fn().mockResolvedValueOnce([{affectedRows: 1}]);

        const response = await request(app)
            .post('/api/users/modifyRole')
            .set('Cookie', [`auth_token=${token}`])
            .send({
               
            })

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe('Impossible de modifier le rôle, veuillez ressayer ultérieurement');
    })

    it('Should return 500 if there is a server error', async () => {
        mysqlClient.query = vi.fn().mockRejectedValue(new Error('Database error'));
        const response = await request(app).post('/api/users/signup').send({
            email: 'test@test.com',
            password: 'testPassword',
            identifiant: 'test',
            role: 'user',
        });
    
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Erreur serveur, merci d\'essayer ultérieurement');
    }); 
})
        