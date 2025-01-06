import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { DeleteGroupe } from '../DeleteGroupe';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Test unitaire du composant DeleteGroupe

describe('DeleteGroupe Component', ()=>{
    it('Should call the function handleDeleteGroupe when user click on the button "Oui"', ()=>{
        const mockHandleDeleteGroupe = vi.fn();
        render(<DeleteGroupe displayDeleteGroupeComponent={vi.fn()} handleDeleteGroupe={mockHandleDeleteGroupe} />)

        const button = screen.getByRole('button', {name: /Oui/i});
        fireEvent.click(button);

        expect(mockHandleDeleteGroupe).toHaveBeenCalled();
        expect(mockHandleDeleteGroupe).toHaveBeenCalledTimes(1);
    })

    it('Should call the function displayDeleteGroupeComponent when user click on the button "Non"', ()=>{
        const mockDisplayDeleteGroupeComponent = vi.fn();
        render(<DeleteGroupe displayDeleteGroupeComponent={mockDisplayDeleteGroupeComponent} handleDeleteGroupe={vi.fn()} />)

        const button = screen.getByRole('button', {name: /Non/i});
        fireEvent.click(button);

        expect(mockDisplayDeleteGroupeComponent).toHaveBeenCalled();
        expect(mockDisplayDeleteGroupeComponent).toHaveBeenCalledWith(false);
        expect(mockDisplayDeleteGroupeComponent).toHaveBeenCalledTimes(1);
    })

    it('Should render the <p> element when messageDeleteGroupe is not empty', ()=>{
        const message = 'Groupe supprimé avec succès';
        render(<DeleteGroupe displayDeleteGroupeComponent={vi.fn()}  messageDeleteGroupe={message} isSuccess={true} />)

        const p = screen.getByText(message);
        
        expect(p).toBeInTheDocument();
    })

    it('apply the correct style to the <p> element when isSuccess is true', ()=>{
        const message = 'Groupe supprimé avec succès';
        render(<DeleteGroupe displayDeleteGroupeComponent={vi.fn()}  messageDeleteGroupe={message} isSuccess={true} />)

        const p = screen.getByText(message);
        
        expect(p).toHaveClass('bg-green-500 text-black');
    })

    it('apply the correct style to the <p> element when isSuccess is false', ()=>{
        const message = 'Groupe supprimé avec succès';
        render(<DeleteGroupe displayDeleteGroupeComponent={vi.fn()}  messageDeleteGroupe={message} isSuccess={false} />)

        const p = screen.getByText(message);
        
        expect(p).toHaveClass('bg-red-600 text-white');
    })

























})