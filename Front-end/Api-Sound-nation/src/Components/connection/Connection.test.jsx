import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { Connection } from './Connection';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// Test unitaire du composant Connection
const mockAuthContext = {
    setConnectInformation: vi.fn(),
    refreshUserInformation: vi.fn(),
  };
  
  describe('Connection Component', () => {
    it('should update email state when user types in the email input', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <BrowserRouter>
            <Connection />
          </BrowserRouter>
        </AuthContext.Provider>
      );
  
      const emailInput = screen.getByLabelText(/email/i); 
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });  
  
      expect(emailInput.value).toBe('test@example.com'); 
    });

    it('should update password state when user types in the password input and the password length 8 charactères', async () => {
        render(
          <AuthContext.Provider value={mockAuthContext}>
            <BrowserRouter>
              <Connection />
            </BrowserRouter>
          </AuthContext.Provider>
        );
    
        const emailInput = screen.getByLabelText(/Mot de passe/i); 
        const submitButton = screen.getByRole('button', {name: /Se connecter/i});
        fireEvent.change(emailInput, { target: { value: 'testtest' } });
        fireEvent.click(submitButton);
        
        
        expect(emailInput.value).toBe('testtest');
        waitFor(() => {
            expect(screen.getByText(/Connexion réussie/i)).toBeInTheDocument();
        });
        
    });

    it('Should display an error message if user submit form without filling all fields', async () => {
        render(
          <AuthContext.Provider value={mockAuthContext}>
            <BrowserRouter>
              <Connection />
            </BrowserRouter>
          </AuthContext.Provider>
        );
    
        const submitButton = screen.getByRole('button', {name: /Se connecter/i});
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText(/Veuillez renseigner tous les champs/i);
        expect(errorMessage).toBeInTheDocument();
    })

    it('Should display an error message if user submit form with wrong email or password', async () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
              <BrowserRouter>
                <Connection />
              </BrowserRouter>
            </AuthContext.Provider>
          );

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/Mot de passe/i);
        fireEvent.change(emailInput, { target: { value: 'invalid@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    
        const submitButton = screen.getByRole('button', {name: /Se connecter/i});
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText(/Erreur, merci de vérifier vos identifiants/i);
        expect(errorMessage).toBeInTheDocument();
    })
  });
