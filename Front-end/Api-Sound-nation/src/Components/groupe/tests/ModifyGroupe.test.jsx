import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { ModifyGroupe } from '../ModifyGroupe';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
// Test unitaire du composant ModifyGroupe

describe('ModifyGroupe Component', ()=>{
    it('Should update groupe name field when user is tipping', ()=>{
        const groupeData = {groupe_bio: "test",
            groupe_date: "Dimanche 24 juillet",
            groupe_hour : 22,
            groupe_image_alt: "Image du groupe Ashkabad",
            groupe_image_name: "Ashkabad_c45e69448c.png",
            groupe_image_path: "uploads/A_s_h_k_a_b_a_d___c_4_5_e_6_9_4_4_8_c_._p_n_g1728917477857.png",
            groupe_name: "Ashkabad",
            groupe_scene: 1,
            id: 10}

        render(<BrowserRouter><ModifyGroupe groupeData={groupeData} setActiveComponentGroupe={vi.fn()} /></BrowserRouter>)

        const nameInput = screen.getByLabelText(/Nom du groupe/i);
        fireEvent.change(nameInput, {target : {value:'Nouveau groupe'}})

        expect(nameInput.value).toBe('Nouveau groupe');
    })

    it('Should update groupe hour field when user click on a choice', ()=>{
        const groupeData = {groupe_bio: "test",
            groupe_date: "Dimanche 24 juillet",
            groupe_hour : 22,
            groupe_image_alt: "Image du groupe Ashkabad",
            groupe_image_name: "Ashkabad_c45e69448c.png",
            groupe_image_path: "uploads/A_s_h_k_a_b_a_d___c_4_5_e_6_9_4_4_8_c_._p_n_g1728917477857.png",
            groupe_name: "Ashkabad",
            groupe_scene: 1,
            id: 10}

        render(<BrowserRouter><ModifyGroupe groupeData={groupeData} setActiveComponentGroupe={vi.fn()} /></BrowserRouter>)

        const hourInput = screen.getByLabelText(/Heure du concert/i);
        fireEvent.change(hourInput, {target : {value: '18'}});

        expect(hourInput.value).toBe('18');
    })

    it('Should display all data of the groupe in the form', ()=>{
        const groupeData = {groupe_bio: "test",
            groupe_date: "Dimanche 24 juillet",
            groupe_hour : 22,
            groupe_image_alt: "Image du groupe Ashkabad",
            groupe_image_name: "Ashkabad_c45e69448c.png",
            groupe_image_path: "uploads/A_s_h_k_a_b_a_d___c_4_5_e_6_9_4_4_8_c_._p_n_g1728917477857.png",
            groupe_name: "Ashkabad",
            groupe_scene: 1,
            id: 10
        }
        render(<BrowserRouter><ModifyGroupe groupeData={groupeData}/></BrowserRouter>)
        expect(screen.getByLabelText(/Nom du groupe/i)).toHaveValue(groupeData.groupe_name);
        expect(screen.getByLabelText(/Heure du concert/i)).toHaveValue(groupeData.groupe_hour.toString());
        expect(screen.getByLabelText(/Date du concert/i)).toHaveValue(groupeData.groupe_date);
        expect(screen.getByLabelText(/Scène/i)).toHaveValue(groupeData.groupe_scene.toString());
        expect(screen.getByLabelText(/Texte alternatif/i)).toHaveValue(groupeData.groupe_image_alt);
        expect(screen.getByLabelText(/Biographie/i)).toHaveValue(groupeData.groupe_bio);
    })
})