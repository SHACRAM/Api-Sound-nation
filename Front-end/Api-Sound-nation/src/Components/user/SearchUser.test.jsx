import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { SearchUser } from './SearchUser';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import userEvent from '@testing-library/user-event';
// Test unitaire du composant SearchUser
describe('SearchUser Component', ()=>{
    it('Should display buttons if the user is an adminSys', async ()=>{
        const mockAuthContext = {
            connectInformation: {
                exp: 1734019058,
                iat: 1733932658,
                user_email: "test@test.com",
                user_name: "test",
                user_role: "adminSys",
            },
        }; 

        
        const mockHandleDeleteDiv = vi.fn();
        const mockHandleModifyDiv = vi.fn();
        const mockData = [{
            user_email: 'test@test.com',
            user_name: 'test',
            user_role: 'user'
        }]

        render(<AuthContext.Provider value={mockAuthContext}><SearchUser handleDeleteDiv={mockHandleDeleteDiv} handleModifyDiv={mockHandleModifyDiv} data={mockData} /></AuthContext.Provider>)
        const input = screen.getByPlaceholderText(/Rechercher/i);
        userEvent.type(input, "test");
        
        await waitFor(() => {
        const deleteButton = screen.getByRole('button', {name: /Supprimer/i});
        const modifyButton = screen.getByRole('button', {name: /Modifier le rôle/i});

        expect(deleteButton).toBeInTheDocument();
        expect(modifyButton).toBeInTheDocument();
        })
    })

    it('Should not display modify role buttons if the user is an admin', async ()=>{
        const mockAuthContext = {
            connectInformation: {
                exp: 1734019058,
                iat: 1733932658,
                user_email: "test@test.com",
                user_name: "test",
                user_role: "admin",
            },
        }; 

        
        const mockHandleDeleteDiv = vi.fn();
        const mockHandleModifyDiv = vi.fn();
        const mockData = [{
            user_email: 'test@test.com',
            user_name: 'test',
            user_role: 'user'
        }]

        render(<AuthContext.Provider value={mockAuthContext}><SearchUser handleDeleteDiv={mockHandleDeleteDiv} handleModifyDiv={mockHandleModifyDiv} data={mockData} /></AuthContext.Provider>)
        const input = screen.getByPlaceholderText(/Rechercher/i);
        userEvent.type(input, "test");
        
        await waitFor(() => {
        const deleteButton = screen.getByRole('button', {name: /Supprimer/i});
        const modifyButton = screen.queryByRole('button', {name: /Modifier le rôle/i});

        expect(deleteButton).toBeInTheDocument();
        expect(modifyButton).not.toBeInTheDocument();
        })
    })



})