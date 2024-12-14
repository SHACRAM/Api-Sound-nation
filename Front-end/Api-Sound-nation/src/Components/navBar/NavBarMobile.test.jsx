import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { NavBarMobile } from './NavBarMobile';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
// Test unitaire du composant NavBarMobile

describe('NavBarMobile Component', ()=>{
    it('Should display the menu when user is connected', async ()=>{
        const mockAuthContext = vi.fn();

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <NavBarMobile isInfoClicked={true} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => {
            const faqTitle = screen.getByRole('link', {name: /FAQ/i});
            const infoPratiqueTitle = screen.getByRole('link', {name : /Infos pratiques/i});
            const cguCookieTitle = screen.getByRole('link', {name :/CGU & cookies/i});

            expect(faqTitle).toBeInTheDocument();
            expect(infoPratiqueTitle).toBeInTheDocument();
            expect(cguCookieTitle).toBeInTheDocument();
        })
    })
})