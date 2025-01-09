import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { NavBarDesktop } from './NavBarDesktop';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// Test unitaire du composant NavBarDesktop

describe('NavBarDesktop Component', ()=>{
    it('Should display the user name when user is connected', async ()=>{
        const mockAuthContext = {
            connectInformation: {
              exp: 1734019058,
              iat: 1733932658,
              user_email: "test@test.com",
              user_name: "test",
              user_role: "admin",
            }
        }
        render(<AuthContext.Provider value={mockAuthContext}><BrowserRouter><NavBarDesktop/></BrowserRouter></AuthContext.Provider>)

        const userNmae = screen.getByText('test');
        expect(userNmae).toBeInTheDocument();
    })

    it('Should call the logOut function when the logOut button is clicked', async ()=>{
        const mockLogOut = vi.fn();
        const mockAuthContext =vi.fn();

        render(<AuthContext.Provider value={mockAuthContext} ><BrowserRouter><NavBarDesktop handleLogOut={mockLogOut}/></BrowserRouter></AuthContext.Provider>)

        const logOutButton = screen.getByRole('button', {name: /Se deconnecter/i});
        fireEvent.click(logOutButton);
        expect(mockLogOut).toHaveBeenCalled();
        expect(mockLogOut).toHaveBeenCalledTimes(1);
    })
})