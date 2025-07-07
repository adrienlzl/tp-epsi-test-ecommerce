import fetchMock from 'jest-fetch-mock';
import {GET} from './route';
import type {Payment} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – paiements', () => {
    // Données mockées conformes à l'interface Payment
    const paiementsMock: Payment[] = [
        {
            id: 'pay1',
            order_id: 'o1',
            customer_id: 'c1',
            currency: 'EUR',
            method: 'Carte Bancaire',
            status: 'completed',
            transaction_date: '2025-07-01T10:00:00Z',
            processor_response: 'OK',
            notes: 'Paiement accepté'
        }
    ];

    it('GET renvoie la liste des paiements et status 200 pour upstream 200', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(paiementsMock), {status: 200});

        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(paiementsMock);
    });

    it('GET renvoie la liste des paiements et status 200 pour upstream 201', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(paiementsMock), {status: 201});

        const res = await GET();
        // upstream.ok est true pour tout code 2xx, donc on renvoie toujours 200
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(paiementsMock);
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 400', async () => {
        fetchMock.mockResponseOnce('', {status: 400});

        const res = await GET();
        expect(res.status).toBe(500);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const error = await res.json();
        expect(error).toEqual({erreur: 'Impossible de récupérer les paiements'});
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET();
        expect(res.status).toBe(500);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const error = await res.json();
        expect(error).toEqual({erreur: 'Impossible de récupérer les paiements'});
    });
});
