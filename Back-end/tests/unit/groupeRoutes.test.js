import { vi, describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../app';
const jwt = require('jsonwebtoken');
import FormData, { from } from 'form-data';
const mysqlClient = require('../../Config/dbConfig');
vi.mock('../Config/dbConfig');

// Fichier de tests unitaires pour les routes de l'entité Groupe
const generateToken = () => {
  const payload = { id: 1, email: 'test@example.com' }; 
  const secret = 'secretKey'; 
  const options = { expiresIn: '1h' }; 
  return jwt.sign(payload, secret, options);
};


// TESTS unitaires de la route /api/groupes et /api/groupes/public/groupes
describe('GET /api/groupes', ()=>{
    it('Should return a list of groupes for the front', async ()=>{
        const response = await request(app)
        .get('/api/groupes/public/groupes')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    })

    it('Should return a list of groupes for the back', async ()=>{
        const token = generateToken();
        const response = await request(app)
        .get('/api/groupes')
        .set('Cookie', [`auth_token=${token}`]);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    })

    it('Should return an error if the token is missing', async ()=>{
        const response = await request(app)
        .get('/api/groupes');
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
    })
})


// TESTS unitaires de la route /addGroupe
describe('POST /api/groupes/addGroupe', () => {
    it('Should return a 201 status code and a confirmation message', async () => {

        const imageTestBuffer = Buffer.from('testImageContent');
        const form = new FormData();

        form.append('name', 'Test Groupe');
        form.append('hour', 20);
        form.append('date', 'Vendredi 22 juillet');
        form.append('scene', 1);
        form.append('alt', 'Image du groupe');
        form.append('bio', 'Un groupe de test');

        form.append('imageGroupe', imageTestBuffer, {
            filename: 'testImage.jpg',
            contentType: 'image/jpeg',
        });

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const token = generateToken();

        const response = await request(app)
            .post('/api/groupes/addGroupe')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le groupe a bien été ajouté');
    });

    it('Should retrun a 400 sattus code if there is no image', async () => {
        const form = new FormData();
        const token = generateToken();

        form.append('name', 'Test Groupe');
        form.append('hour', 20);
        form.append('date', 'Vendredi 22 juillet');
        form.append('scene', 1);
        form.append('alt', 'Image du groupe');
        form.append('bio', 'Un groupe de test');

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();
        const response = await request(app)
            .post('/api/groupes/addGroupe')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
    });
});

// TESTS unitaires de la route /modifyGroupe
describe('PUT /:id', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('Should return a 200 status code and a confirmation message', async () => {
        mysqlClient.query = vi.fn().mockResolvedValue([{ affectedRows: 1 }]);
        const imageTestBuffer = Buffer.from('testImageContent');
        const form = new FormData();

        form.append('name', 'Test Groupe');
        form.append('hour', 20);
        form.append('date', 'Vendredi 22 juillet');
        form.append('scene', 1);
        form.append('alt', 'Image du groupe');
        form.append('bio', 'Un groupe de test');

        form.append('imageGroupe', imageTestBuffer, {
            filename: 'testImage.jpg',
            contentType: 'image/jpeg',
        });

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const token = generateToken();

        const response = await request(app)
            .put('/api/groupes/17')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le groupe a bien été modifié');
    });

    it('Should return a 400 status code if there is no image', async () => {
        const form = new FormData();
        const token = generateToken();

        form.append('name', 'Test Groupe');
        form.append('hour', 20);
        form.append('date', 'Vendredi 22 juillet');
        form.append('scene', 1);
        form.append('alt', 'Image du groupe');
        form.append('bio', 'Un groupe de test');

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();
        const response = await request(app)
            .post('/api/groupes/17')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        
    });
    it('Should return a 404 status if there is no groupe with id match', async () => {
        mysqlClient.query = vi.fn().mockResolvedValue([{ affectedRows: 0 }]);
        const imageTestBuffer = Buffer.from('testImageContent');
        const form = new FormData();

        form.append('name', 'Test Groupe');
        form.append('hour', 20);
        form.append('date', 'Vendredi 22 juillet');
        form.append('scene', 1);
        form.append('alt', 'Image du groupe');
        form.append('bio', 'Un groupe de test');

        form.append('imageGroupe', imageTestBuffer, {
            filename: 'testImage.jpg',
            contentType: 'image/jpeg',
        });

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const token = generateToken();

        const response = await request(app)
            .post('/api/groupes/800')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Groupe non trouvé');
    });
});

// TESTS unitaires de la route /deleteGroupe

describe('DELETE /:id', () => {
    it('Should return a 200 status code and a confimation message if the groupe is deleted', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([{ affectedRows: 1 }]);
        const token = generateToken();
        const response = await request(app)
        .delete('/api/groupes/17')
        .set('Cookie', [`auth_token=${token}`])
        .send();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le groupe a bien été supprimé');
    })

    it('Should return a 404 status code if there is no groupe with id match', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([{ affectedRows: 0 }]);
        const token = generateToken();
        const response = await request(app)
        .post('/api/groupes/800')
        .set('Cookie', [`auth_token=${token}`])
        .send();
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Groupe non trouvé');
    })
});


// TESTS unitaires de la route /api/groupes/:id

describe('GET /:id', () => {
    afterEach(() => {
        vi.clearAllMocks(); 
      });
    it('Should return a 200 status code  if the groupe is found', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[
            { id: '123', groupe_name: 'Test Groupe', groupe_hour: 20, groupe_date: 'Vendredi 22 juillet', groupe_scene: 1, groupe_image_name: 'testImage.jpg', groupe_image_path: '/path/to/image', groupe_image_alt: 'Image du groupe', groupe_bio: 'Un groupe de test' }
          ]]);
        const response = await request(app)
        .get('/api/groupes/123')
        .send();
        
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toEqual({
            id: '123',
            groupe_name: 'Test Groupe',
            groupe_hour: 20,
            groupe_date: 'Vendredi 22 juillet',
            groupe_scene: 1,
            groupe_image_name: 'testImage.jpg',
            groupe_image_path: '/path/to/image',
            groupe_image_alt: 'Image du groupe',
            groupe_bio: 'Un groupe de test'
        })
    })

    it('Should return a 404 status code if there is no groupe with id match', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[]]);
        const response = await request(app)
        .get('/api/groupes/2')
        .send();
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Groupe non trouvé');
    })
});