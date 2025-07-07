import fetchMock from 'jest-fetch-mock';
import { GET } from './route';
import type { Address } from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – adresse par ID', () => {
    const fakeReq = {} as Request;
    const context = { params: { id: '123' } };

    it('GET doit renvoyer l’adresse et status 200 pour un upstream 200', async () => {
        const adresseMock: Address = {
            id: '123',
            street: '5 rue de la Paix',
            city: 'Paris',
            zipCode: '75002',
            country: 'France',
            addressType: 'shipping',
            userId: null
        };
        // upstream renvoie 200 et l’objet JSON
        fetchMock.mockResponseOnce(JSON.stringify(adresseMock), { status: 200 });

        const response = await GET(fakeReq, context);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(adresseMock);
    });

    it('GET doit renvoyer l’adresse au status 200 même si upstream retourne 201', async () => {
        const adresseMock: Address = {
            id: '123',
            street: '10 avenue des Champs-Élysées',
            city: 'Paris',
            zipCode: '75008',
            country: 'France',
            addressType: 'billing',
            userId: 'user-xyz'
        };
        // upstream renvoie 201 et l’objet JSON
        fetchMock.mockResponseOnce(JSON.stringify(adresseMock), { status: 201 });

        const response = await GET(fakeReq, context);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(adresseMock);
    });

    it('GET doit renvoyer status 200 et JSON d’erreur upstream pour un upstream 400', async () => {
        const erreur400 = { message: 'Requête invalide' };
        // upstream renvoie 400 et un JSON d’erreur
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), { status: 400 });

        const response = await GET(fakeReq, context);
        // Comme le code ne gère que le 404, il retourne 200
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(erreur400);
    });

    it('GET doit renvoyer une erreur 404 pour un upstream 404', async () => {
        // upstream renvoie 404 sans corps
        fetchMock.mockResponseOnce('', { status: 404 });

        const response = await GET(fakeReq, context);
        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({ erreur: 'Adresse non trouvée' });
    });
});
