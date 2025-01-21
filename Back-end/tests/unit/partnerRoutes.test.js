import { vi, describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../api/app';
const jwt = require('jsonwebtoken');
import FormData, { from } from 'form-data';
const mysqlClient = require('../../config/dbConfig');
vi.mock('../config/dbConfig');

// Fichier de tests unitaires pour les routes de l'entité Partner
const generateToken = () => {
    const payload = { id: 1, email: 'test@example.com' }; 
    const secret = 'KeySecret'; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign(payload, secret, options);
  };

// Route qui permet de récupérer tous les partenaires côté back-office
describe('Get all partners /api/patners', () => {
    it('Should return all partners to the front and 200 status code', async () => {
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([[
            { 
                id: '', 
                partner_name: '', 
                partner_category: '', 
                partner_image_alt: '', 
                partner_image_name: '', 
                partner_image_path: '', 
                partner_site: '' 
            }
        ]]);
    
        const response = await request(app)
            .get('/api/partners')
            .set('Cookie', [`auth_token=${token}`]);
    
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toMatchObject([
            {
                id: '',
                partner_name: '',
                partner_category: '',
                partner_image_alt: '',
                partner_image_name: '',
                partner_image_path: '',
                partner_site: ''
            }
        ]);
    });  
    
    it('Should return an error and redirect the user if the user is not an Admin', async () => {
        const response = await request(app)
            .get('/api/partners')
        expect(response.status).toBe(302);
    });
});

// Route qui permet de récupèrer tous les partenaires côté front
describe('GET /getPartners/public' , ()=>{
    it(('Should return all parnters to the front and 200 status code'), async () => {
        mysqlClient.query = vi.fn().mockResolvedValue([[
            { 
                id: '', 
                partner_name: '', 
                partner_category: '', 
                partner_image_alt: '', 
                partner_image_name: '', 
                partner_image_path: '', 
                partner_site: '' 
            }
        ]]);
    
        const response = await request(app)
            .get('/api/partners/getPartners/public');
            
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toMatchObject([
            {
                id: '',
                partner_name: '',
                partner_category: '',
                partner_image_alt: '',
                partner_image_name: '',
                partner_image_path: '',
                partner_site: ''
            }
        ]);
    });

    it('Should return a 404 status code if there is no partner', async ()=>{
        mysqlClient.query = vi.fn().mockResolvedValue([[]]);
        const response = await request(app)
            .get('/api/partners/getPartners/public');

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.data).toMatchObject([]);
    })

})

// TESTS unitaires pour la route qui permet d'ajouter un partenaire
describe('POST /api/partners/addPartner', ()=>{
    it('Should return a 201 status code and a confirmation message', async ()=>{
        const token = generateToken();
        const form = new FormData();
        const imageTestBuffer = Buffer.from('testImageContent');
        form.append('name', 'testName' );
        form.append('site', 'testSite');
        form.append('category', 'testCategory');
        form.append('alt', 'testAlt');
        form.append('imagePartner', imageTestBuffer, {filename: 'testImage.png'});
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const response = await request(app)
        .post('/api/partners/addPartner')
        .set('Cookie', [`auth_token=${token}`])
        .set(headers)
        .send(formBuffer);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le partenaire a bien été ajouté');
    });

    it('Should return a 400 status code and a message error if there is no image in the request', async ()=>{
        const token = generateToken();
        const form = new FormData();
        form.append('name', 'testName' );
        form.append('site', 'testSite');
        form.append('category', 'testCategory');
        form.append('alt', 'testAlt');
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const response = await request(app)
        .post('/api/partners/addPartner')
        .set('Cookie', [`auth_token=${token}`])
        .set(headers)
        .send(formBuffer);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Aucune image envoyée');
    });
})


//TESTS unitaires pour la route qui permet de modifier un partenaire
describe('POST api/partners/modifyPartner',  ()=>{
    it('Should return a 200 status code and a confirmation message', async ()=>{
        const token = generateToken();
        const form = new FormData();
        const imageTestBuffer = Buffer.from('testImageContent');
        form.append('name', 'testName' );
        form.append('site', 'testSite');
        form.append('category', 'testCategory');
        form.append('alt', 'testAlt');
        form.append('imagePartner', imageTestBuffer, {filename: 'testImage.png'});
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const response = await request(app)
            .put('/api/partners/partner/1')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer);


        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le partenaire a bien été modifié');
    })


    it('Should return a 400 satus code and a message error if there is no image in the request', async ()=>{  
        const token = generateToken();
        const form = new FormData();
        form.append('name', 'testName' );
        form.append('site', 'testSite');
        form.append('category', 'testCategory');
        form.append('alt', 'testAlt');
       
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const response = await request(app)
            .put('/api/partners/partner/1')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer);


        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Aucune image envoyée');
    });

    it('Should return a 404 status code ans a message error if the partner is not found', async ()=>{
        const token = generateToken();
        const form = new FormData();
        const imageTestBuffer = Buffer.from('testImageContent');
        form.append('name', 'testName' );
        form.append('site', 'testSite');
        form.append('category', 'testCategory');
        form.append('alt', 'testAlt');
        form.append('imagePartner', imageTestBuffer, {filename: 'testImage.png'});
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);

        const formBuffer = form.getBuffer();
        const headers = form.getHeaders();

        const response = await request(app)
            .put('/api/partners/partner/130')
            .set('Cookie', [`auth_token=${token}`])
            .set(headers)
            .send(formBuffer);


        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Le partenaire n\'a pas été trouvé');
    })
})

// TESTS unitaires pour la route qui permet de supprimer un partenaire
describe('POST api/partners/deletePartner', ()=>{
    it('Should return a 200 status code and a confirmation message', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 1}]);

        const response = await request(app)
        .delete('/api/partners/partner/1')
        .set('Cookie', [`auth_token=${token}`])
        

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Le partenaire a bien été supprimé');
    });

    it('Should return a 404 status code and a message error if the partner is not found', async ()=>{
        const token = generateToken();
        mysqlClient.query = vi.fn().mockResolvedValue([{affectedRows: 0}]);

        const response = await request(app)
            .delete('/api/partners/partner/130')
            .set('Cookie', [`auth_token=${token}`])
            

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Aucun partenaire trouvé avec cet ID');
    });
})
