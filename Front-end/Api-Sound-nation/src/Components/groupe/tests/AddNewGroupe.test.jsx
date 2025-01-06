import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { AddNewGroupe } from '../AddNewGroupe';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// Test unitaire du composant AddNewGroupe

describe('AddNewGroupe Component', ()=>{
    it('Update groupe name field when user is tipping', ()=>{
        render(<AddNewGroupe setActiveComponentGroupe={vi.fn()} />)
        const nameInput = screen.getByLabelText(/Nom du groupe/i);
        fireEvent.change(nameInput, {target : {value:'Nouveau groupe'}})

        expect(nameInput.value).toBe('Nouveau groupe');
    })

    it('Update grouepe hour field when user click on a choice', ()=>{
        render(<AddNewGroupe setActiveComponentGroupe={vi.fn()} />)
        const input = screen.getByLabelText(/Heure du concert/i);
        fireEvent.change(input, {target : {value: '18'}});

        expect(input.value).toBe('18');
    })

    it('Should display a message if user submit form without filling all fields', async ()=>{
        render(<AddNewGroupe setActiveComponentGroupe={vi.fn()} />)
        const submitButton = screen.getByRole('button', {name: /ajouter/i});
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText(/Veuillez renseigner tous les champs/i);
        expect(errorMessage).toBeInTheDocument();
    })

    it('Should submit the form successfully when all fields are valide', async ()=>{
        const mockeAxios = new MockAdapter(axios);
        const mockResponse = {status: true, message: 'Le groupe a bien été ajouté'};
        mockeAxios.onPost(`${import.meta.env.VITE_API_URL}/api/groupes/addGroupe`).reply(201, mockResponse);
        render(<AddNewGroupe setActiveComponentGroupe={vi.fn()} />)

        fireEvent.change(screen.getByLabelText(/Nom du groupe/i), {target : {value:'Nouveau groupe'}});
        fireEvent.change(screen.getByLabelText(/Heure du concert/i), {target : {value:'18'}});
        fireEvent.change(screen.getByLabelText(/Date du concert/i), {target : {value:'Vendredi 22 juillet'}});
        fireEvent.change(screen.getByLabelText(/Scène/i), {target : {value:'1'}});
        fireEvent.change(screen.getByLabelText(/Texte alternatif/i), { target: { value: 'Image description' } });
        fireEvent.change(screen.getByLabelText(/Biographie/i), { target: { value: 'Group bio' } });

        const fileInput = screen.getByLabelText(/Image du groupe/i);
        const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        fireEvent.click(screen.getByRole('button', {name: /Ajouter/i}));

        await waitFor(()=>{
            expect(screen.getByText(/Le groupe a bien été ajouté/i)).toBeInTheDocument();
        })
        
    })
})