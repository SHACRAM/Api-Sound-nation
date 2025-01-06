import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { DisplayAllGroupeByDay } from '../DisplayAllGroupeByDay';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
// Test unitaire du composant DisplayAllGroupeByDay
describe('DisplayAllGroupeByDay Component', ()=>{
    it('Should verify what the component display', async ()=>{
        const jour = [{
            groupe_bio: "test",
            groupe_date: "Dimanche 24 juillet",
            groupe_hour : 22,
            groupe_image_alt: "Image du groupe Ashkabad",
            groupe_image_name: "Ashkabad_c45e69448c.png",
            groupe_image_path: "uploads/A_s_h_k_a_b_a_d___c_4_5_e_6_9_4_4_8_c_._p_n_g1728917477857.png",
            groupe_name: "Ashkabad",
            groupe_scene: 1,
            id: 10
        }]
        render(<BrowserRouter><DisplayAllGroupeByDay jour={jour} dateConcert="Vendredi 22 juillet"/></BrowserRouter>)
        const button = screen.getByRole('button', {name: /Supprimer/i});
        fireEvent.click(button);
        
        expect(screen.getByText(/Vendredi 22 juillet/i)).toBeInTheDocument();
        expect(screen.getByText(/Ashkabad/i)).toBeInTheDocument();
    })

    it('Should verify if the delete component is displayed when user click on delete button', async ()=>{
        vi.mock("./DeleteGroupe", () => ({
            DeleteGroupe: ({ messageDeleteGroupe }) => (
              <div>{messageDeleteGroupe}</div>
            ),
          }));
          const jour = [{
            groupe_bio: "test",
            groupe_date: "Dimanche 24 juillet",
            groupe_hour : 22,
            groupe_image_alt: "Image du groupe Ashkabad",
            groupe_image_name: "Ashkabad_c45e69448c.png",
            groupe_image_path: "uploads/A_s_h_k_a_b_a_d___c_4_5_e_6_9_4_4_8_c_._p_n_g1728917477857.png",
            groupe_name: "Ashkabad",
            groupe_scene: 1,
            id: 10
        }]
          
        render(<BrowserRouter><DisplayAllGroupeByDay jour={jour} dateConcert="Vendredi 22 juillet"/></BrowserRouter>)
        const button = screen.getByRole('button', {name:/Supprimer/i});
        fireEvent.click(button);

        expect(screen.getByText(/Voulez-vous supprimer ce groupe?/i)).toBeInTheDocument();
    })
})