import fetchMock from 'jest-fetch-mock';
import {GET} from './route';
import type {Order} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – commande par ID', () => {
    const fakeReq = {} as Request;
    const context = {params: {id: 'o1'}};

    it('GET renvoie la commande et status 200 pour upstream 200', async () => {
        const orderMock: Order = {
            id: 'o1',
            orderDate: '2025-07-01T12:00:00Z',
            status: 'pending',
            customerId: 'c1',
            shippingAddressId: 'a1',
            billingAddressId: 'a2',
            carrierId: 'car1',
            paymentId: 'pay1',
            orderTotal: 100
        };
        fetchMock.mockResponseOnce(JSON.stringify(orderMock), {status: 200});

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(orderMock);
    });

    it('GET renvoie la commande et status 200 pour upstream 201', async () => {
        const orderMock: Order = {
            id: 'o2',
            orderDate: '2025-07-02T15:30:00Z',
            status: 'shipped',
            customerId: 'c2',
            shippingAddressId: 'a3',
            billingAddressId: 'a4',
            carrierId: 'car2',
            paymentId: 'pay2',
            orderTotal: 200
        };
        fetchMock.mockResponseOnce(JSON.stringify(orderMock), {status: 201});

        const res = await GET(fakeReq, context);
        // Seul le statut 404 est géré en erreur, tout autre statut non-404 est traité comme succès
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(orderMock);
    });

    it('GET renvoie status 200 et JSON d’erreur pour upstream 400', async () => {
        const erreur400 = {message: 'Requête invalide'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), {status: 400});

        const res = await GET(fakeReq, context);
        // 400 n'est pas 404 => traité en réussite
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(erreur400);
    });

    it('GET renvoie status 404 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(404);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual({erreur: 'Commande non trouvée'});
    });
});
