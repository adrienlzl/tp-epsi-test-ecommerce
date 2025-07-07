import fetchMock from 'jest-fetch-mock';
import {GET} from './route';
import type {Payment} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – paiement par ID', () => {
    const fakeReq = {} as Request;
    const context = {params: {id: 'pay1'}};

    it('GET renvoie le paiement et status 200 pour upstream 200', async () => {
        const paymentMock: Payment = {
            id: 'pay1',
            order_id: 'o1',
            customer_id: 'c1',
            currency: 'EUR',
            method: 'Carte Bancaire',
            status: 'completed',
            transaction_date: '2025-07-01T10:00:00Z',
            processor_response: 'OK',
            notes: 'Paiement accepté'
        };
        fetchMock.mockResponseOnce(JSON.stringify(paymentMock), {status: 200});

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(paymentMock);
    });

    it('GET renvoie le paiement et status 200 pour upstream 201', async () => {
        const paymentMock: Payment = {
            id: 'pay2',
            order_id: 'o2',
            customer_id: 'c2',
            currency: 'EUR',
            method: 'PayPal',
            status: 'pending',
            transaction_date: '2025-07-02T14:30:00Z',
            processor_response: 'En attente',
            notes: 'Vérification en cours'
        };
        fetchMock.mockResponseOnce(JSON.stringify(paymentMock), {status: 201});

        const res = await GET(fakeReq, context);
        // Seul le statut 404 produit une erreur ; ici on retourne toujours 200
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(paymentMock);
    });

    it('GET renvoie status 200 et JSON d’erreur pour upstream 400', async () => {
        const erreur400 = {message: 'Requête invalide'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), {status: 400});

        const res = await GET(fakeReq, context);
        // 400 n'est pas 404 → traité comme succès
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(erreur400);
    });

    it('GET renvoie status 404 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(404);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual({erreur: 'Paiement non trouvé'});
    });
});
