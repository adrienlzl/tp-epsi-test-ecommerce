import fetchMock from 'jest-fetch-mock';
import { GET, POST } from './route';
import type { Address } from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – adresses', () => {
    // --- GET succès ---
    it('GET doit renvoyer la liste des adresses en cas de succès', async () => {
        const adressesMock: Address[] = [
            {
                id: '1',
                street: '10 rue de Paris',
                city: 'Paris',
                zipCode: '75001',
                country: 'France',
                addressType: 'shipping',
                userId: null
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(adressesMock), { status: 200 });

        const response = await GET();
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(adressesMock);
    });

    // --- GET échec générique (status non-ok) ---
    it('GET renvoie une erreur 500 pour un status 400 upstream', async () => {
        fetchMock.mockResponseOnce('', { status: 400 });

        const response = await GET();
        expect(response.status).toBe(500);

        const data = await response.json();
        expect(data).toEqual({ erreur: 'Impossible de récupérer les adresses' });
    });

    it('GET renvoie une erreur 500 pour un status 404 upstream', async () => {
        fetchMock.mockResponseOnce('', { status: 404 });

        const response = await GET();
        expect(response.status).toBe(500);

        const data = await response.json();
        expect(data).toEqual({ erreur: 'Impossible de récupérer les adresses' });
    });

    // --- POST succès ---
    it('POST doit créer une adresse et renvoyer la réponse du serveur', async () => {
        const nouvelleAdresse = {
            street: '20 boulevard Saint-Germain',
            city: 'Paris',
            zipCode: '75006',
            country: 'France',
            addressType: 'billing',
            userId: 'user-uuid-123'
        };
        const reponseUpstream: Address = {
            id: '99',
            ...nouvelleAdresse
        };

        fetchMock.mockResponseOnce(JSON.stringify(reponseUpstream), { status: 201 });

        const fakeReq = {
            json: async () => nouvelleAdresse
        } as unknown as Request;

        const response = await POST(fakeReq);
        expect(response.status).toBe(201);

        const data = await response.json();
        expect(data).toEqual(reponseUpstream);
    });

    // --- POST erreurs propagées ---
    it('POST renvoie le status et le message d’erreur pour un status 400 upstream', async () => {
        const erreur400 = { message: 'Payload invalide' };
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), { status: 400 });

        const fakeReq = { json: async () => ({}) } as unknown as Request;
        const response = await POST(fakeReq);
        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual(erreur400);
    });

    it('POST renvoie le status et le message d’erreur pour un status 404 upstream', async () => {
        const erreur404 = { message: 'Ressource non trouvée' };
        fetchMock.mockResponseOnce(JSON.stringify(erreur404), { status: 404 });

        const fakeReq = { json: async () => ({}) } as unknown as Request;
        const response = await POST(fakeReq);
        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual(erreur404);
    });
});
