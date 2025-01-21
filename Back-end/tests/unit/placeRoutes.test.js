import { vi, describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../api/app';
const jwt = require('jsonwebtoken');
import FormData, { from } from 'form-data';
const mysqlClient = require('../../config/dbConfig');
vi.mock('../config/dbConfig');
// Fichier de tests unitaires pour les routes de l'entité Lieu

const generateToken = () => {
    const payload = { id: 1, email: 'test@example.com' }; 
    const secret = 'KeySecret'; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign(payload, secret, options);
  };

// TESTS unitaire de la route api/places/addPlace qui permet d'ajouter un lieu en base de données
describe('POST /api/places/addPlace', ()=>{
    it('Should return a 201 status code and a success message', async ()=>{
        const token = generateToken();
        const testImageLogoBuffer = Buffer.from('testImageLogo');
        const testImageBuffer = Buffer.from('testImage');

        const form = new FormData();
        form.append('name', 'test');
        form.append('category', 'test');
        form.append('latitude', 'test');
        form.append('longitude', 'test');
        form.append('markerDiametre', 'test');
        form.append('color', 'test');
        form.append('images', testImageLogoBuffer, {filename: 'testImageLogo.png'});
        form.append('logoPath', 'test');
        form.append('altLogo', 'test');
        form.append('images', testImageBuffer, {filename: 'testImage.png'});
        form.append('imagePath', 'test');
        form.append('altImage', 'test');
        form.append('info', 'test');

        const headers = form.getHeaders();
        const buffer = form.getBuffer();

        mysqlClient.query = vi.fn().mockResolvedValueOnce([{affectedRows: 1}]);

        const response = await request(app)
        .post('/api/places/addPlace')
        .set('Cookie', [`auth_token=${token}`])
        .set(headers)
        .send(buffer);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le lieu a bien été ajouté');
    });

    it('Should return a 400 status code and an error message if images are missing', async ()=>{
        const token = generateToken();
        const form = new FormData();
        form.append('name', 'test');
        form.append('category', 'test');
        form.append('latitude', 'test');
        form.append('longitude', 'test');
        form.append('markerDiametre', 'test');
        form.append('color', 'test');
        form.append('altLogo', 'test');
        form.append('altImage', 'test');
        form.append('info', 'test');
        mysqlClient.query = vi.fn().mockResolvedValueOnce([{affectedRows: 0}]);
        const headers = form.getHeaders();
        const buffer = form.getBuffer();

        const response = await request(app)
            .post('/api/places/addPlace')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(buffer);
            

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Vous devez envoyer au moins 2 fichiers.');
    });

    it('Should return a 400 status code if there is only one image send', async ()=>{
        const token = generateToken();
        const testImageLogoBuffer = Buffer.from('testImageLogo');

        const form = new FormData();
        form.append('name', 'test');
        form.append('category', 'test');
        form.append('latitude', 'test');
        form.append('longitude', 'test');
        form.append('markerDiametre', 'test');
        form.append('color', 'test');
        form.append('images', testImageLogoBuffer, {filename: 'testImageLogo.png'});
        form.append('logoPath', 'test');
        form.append('altLogo', 'test');
        form.append('imagePath', 'test');
        form.append('altImage', 'test');
        form.append('info', 'test');

        const headers = form.getHeaders();
        const buffer = form.getBuffer();

        mysqlClient.query = vi.fn().mockResolvedValueOnce([{affectedRows: 0}]);

        const response = await request(app)
        .post('/api/places/addPlace')
        .set('Cookie', [`auth_token=${token}`])
        .set(headers)
        .send(buffer);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Vous devez envoyer au moins 2 fichiers.');
    })
})

// TESTS unitaires de la route api/places/ qui permet de récupèrer tous les lieux en base de données
describe('GET /api/places/', ()=>{
    it('Should return a 200 status code and verify the structure of the response if there is a valide token', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([[{
            id: 1,
            place_name: '',
            place_category: '',
            place_latitude: '',
            place_longitude: '',
            place_marker_diametre: '',
            place_marker_color: '',
            place_logo_name: '',
            place_logo_path: '',
            place_logo_alt: '',
            place_image_name: '',
            place_image_path: '',
            place_image_alt: '',
            place_info_popup: ''
        }]]);

        const response = await request(app)
            .get('/api/places/')
            .set('Cookie', [`auth_token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data).toMatchObject([{
            id: expect.any(Number),
            place_name: expect.any(String),
            place_category: expect.any(String),
            place_latitude: expect.any(String),
            place_longitude: expect.any(String),
            place_marker_diametre: expect.any(String),
            place_marker_color: expect.any(String),
            place_logo_name: expect.any(String),
            place_logo_path: expect.any(String),
            place_logo_alt: expect.any(String),
            place_image_name: expect.any(String),
            place_image_path: expect.any(String),
            place_image_alt: expect.any(String),
            place_info_popup: expect.any(String)

        }])
    })
    it('Should return a 302 status code and redirect user if there is no valide token ', async()=>{
        const response = await request(app)
            .get('/api/places/')

        expect(response.status).toBe(302);
        
    })

})

// TESTS unitaires de la route /api/places/public/places qui permet de récupèrer tous les lieux en base de données pour le front

describe('GET /api/places/places/public', ()=>{
    it('Should return a 200 status code and return an Array of all places', async()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[{
            id: 1,
            place_name: '',
            place_category: '',
            place_latitude: '',
            place_longitude: '',
            place_marker_diametre: '',
            place_marker_color: '',
            place_logo_name: '',
            place_logo_path: '',
            place_logo_alt: '',
            place_image_name: '',
            place_image_path: '',
            place_image_alt: '',
            place_info_popup: ''
        }]]);
        const response = await request(app)
            .get('/api/places/places/public');
         
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toMatchObject([{
            id: expect.any(Number),
            place_name: expect.any(String),
            place_category: expect.any(String),
            place_latitude: expect.any(String),
            place_longitude: expect.any(String),
            place_marker_diametre: expect.any(String),
            place_marker_color: expect.any(String),
            place_logo_name: expect.any(String),
            place_logo_path: expect.any(String),
            place_logo_alt: expect.any(String),
            place_image_name: expect.any(String),
            place_image_path: expect.any(String),
            place_image_alt: expect.any(String),
            place_info_popup: expect.any(String)
        }])    
    })
})

describe('DELETE /api/places/place', ()=>{
    it('Should return a 200 status code and a success message if the place is deleted', async()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
            .delete('/api/places/place/1')
            .set('Cookie', [`auth_token=${token}`])
            

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le lieu a bien été supprimé');    
    });

    

    
})

// TESTS unitaires de la route api/places/modifyPlace qui permet de modifier un lieu en base de données

describe('POST /api/places/modifyPlace', ()=>{
    it('Should return a 200 status code and a success message if the place is modified', async()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);
        const testImageLogoBuffer = Buffer.from('testImageLogo');
        const testImageBuffer = Buffer.from('testImage');
        const form = new FormData();
        
        form.append('name', 'test');
        form.append('category', 'test');
        form.append('latitude', 'test');
        form.append('longitude', 'test');
        form.append('markerDiametre', 'test');
        form.append('color', 'test');
        form.append('images', testImageLogoBuffer, {filename: 'testImageLogo.png'});
        form.append('logoPath', 'test');
        form.append('altLogo', 'test');
        form.append('images', testImageBuffer, {filename: 'testImage.png'});
        form.append('imagePath', 'test');
        form.append('altImage', 'test');
        form.append('info', 'test');

        const headers = form.getHeaders();
        const buffer = form.getBuffer();

        const response = await request(app)
            .put('/api/places/place/1')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(buffer);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le lieu a bien été modifié');
    })

    it('Should return a 400 status code and an error message if 0 or less than 2 images are sent', async()=>{
        const token = generateToken();
        const form = new FormData();

        form.append('name', 'test');
        form.append('category', 'test');
        form.append('latitude', 'test');
        form.append('longitude', 'test');
        form.append('markerDiametre', 'test');
        form.append('color', 'test');
        form.append('altLogo', 'test');
        form.append('altImage', 'test');
        form.append('info', 'test');
    
        const buffer = form.getBuffer();

        const response = await request(app)
            .put('/api/places/place/1')
            .set('Cookie', [`auth_token=${token}`])
            .send(buffer);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Vous devez envoyer au moins 2 images.');
    })








})


