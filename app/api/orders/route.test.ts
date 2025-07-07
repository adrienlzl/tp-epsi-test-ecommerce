import fetchMock from 'jest-fetch-mock';
import {GET, POST} from './route';
import type {Order} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – commandes', () => {
    // --- GET ---

    it('GET renvoie la liste des commandes et status 200 pour upstream 200', async () => {
        const commandesMock: Order[] = [
            {
                id: 'o1',
                orderDate: '2025-07-01T12:00:00Z',
                status: 'pending',
                customerId: 'c1',
                shippingAddressId: 'a1',
                billingAddressId: 'a2',
                carrierId: 'car1',
                paymentId: 'pay1',
                orderTotal: 100
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(commandesMock), {status: 200});

        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(commandesMock);
    });

    it('GET renvoie la liste des commandes et status 200 pour upstream 201', async () => {
        const commandesMock: Order[] = [
            {
                id: 'o2',
                orderDate: '2025-07-02T15:30:00Z',
                status: 'shipped',
                customerId: 'c2',
                shippingAddressId: 'a3',
                billingAddressId: 'a4',
                carrierId: 'car2',
                paymentId: 'pay2',
                orderTotal: 200
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(commandesMock), {status: 201});

        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(commandesMock);
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 400', async () => {
        fetchMock.mockResponseOnce('', {status: 400});

        const res = await GET();
        expect(res.status).toBe(500);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual({erreur: 'Impossible de récupérer les commandes'});
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET();
        expect(res.status).toBe(500);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual({erreur: 'Impossible de récupérer les commandes'});
    });

    // --- POST ---

    it('POST crée une commande et renvoie status 200 pour upstream 200', async () => {
        const nouvelleCommande = {
            orderDate: '2025-07-03T10:00:00Z',
            status: 'pending',
            customerId: 'c3',
            shippingAddressId: 'a5',
            billingAddressId: 'a6',
            carrierId: 'car3',
            paymentId: 'pay3',
            orderTotal: 150
        };
        const upstreamResponse: Order = {id: 'o3', ...nouvelleCommande};
        fetchMock.mockResponseOnce(JSON.stringify(upstreamResponse), {status: 200});

        const fakeReq = {json: async () => nouvelleCommande} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(upstreamResponse);
    });

    it('POST crée une commande et renvoie status 201 pour upstream 201', async () => {
        const nouvelleCommande = {
            orderDate: '2025-07-04T11:15:00Z',
            status: 'pending',
            customerId: 'c4',
            shippingAddressId: 'a7',
            billingAddressId: 'a8',
            carrierId: 'car4',
            paymentId: 'pay4',
            orderTotal: 250
        };
        const upstreamResponse: Order = {id: 'o4', ...nouvelleCommande};
        fetchMock.mockResponseOnce(JSON.stringify(upstreamResponse), {status: 201});

        const fakeReq = {json: async () => nouvelleCommande} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(201);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(upstreamResponse);
    });

    it('POST renvoie status 400 et JSON d’erreur pour upstream 400', async () => {
        const erreur400 = {message: 'Requête invalide'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), {status: 400});

        const fakeReq = {json: async () => ({})} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(400);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(erreur400);
    });

    it('POST renvoie status 404 et JSON d’erreur pour upstream 404', async () => {
        const erreur404 = {message: 'Ressource non trouvée'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur404), {status: 404});

        const fakeReq = {json: async () => ({})} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(404);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(erreur404);
    });
});
