import fetchMock from 'jest-fetch-mock';
import {GET, POST} from './route';
import type {OrderItem} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – éléments de commande', () => {
    // --- GET ---

    it('GET renvoie la liste des éléments et status 200 pour upstream 200', async () => {
        const itemsMock: OrderItem[] = [
            {
                id: 'oi1',
                orderId: 'o1',
                productId: 'p1',
                quantity: 2,
                unitPrice: 10,
                totalPrice: 20
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(itemsMock), {status: 200});

        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(itemsMock);
    });

    it('GET renvoie la liste des éléments et status 200 pour upstream 201', async () => {
        const itemsMock: OrderItem[] = [
            {
                id: 'oi2',
                orderId: 'o2',
                productId: 'p2',
                quantity: 5,
                unitPrice: 8,
                totalPrice: 40
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(itemsMock), {status: 201});

        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(itemsMock);
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 400', async () => {
        fetchMock.mockResponseOnce('', {status: 400});

        const res = await GET();
        expect(res.status).toBe(500);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual({erreur: 'Impossible de récupérer les éléments de commande'});
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET();
        expect(res.status).toBe(500);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual({erreur: 'Impossible de récupérer les éléments de commande'});
    });

    // --- POST ---

    it('POST renvoie l’élément créé et status 200 pour upstream 200', async () => {
        const newItem = {orderId: 'o3', productId: 'p3', quantity: 1, unitPrice: 15, totalPrice: 15};
        const created: OrderItem = {id: 'oi3', ...newItem};
        fetchMock.mockResponseOnce(JSON.stringify(created), {status: 200});

        const fakeReq = {json: async () => newItem} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(created);
    });

    it('POST renvoie l’élément créé et status 201 pour upstream 201', async () => {
        const newItem = {orderId: 'o4', productId: 'p4', quantity: 3, unitPrice: 7, totalPrice: 21};
        const created: OrderItem = {id: 'oi4', ...newItem};
        fetchMock.mockResponseOnce(JSON.stringify(created), {status: 201});

        const fakeReq = {json: async () => newItem} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(201);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(created);
    });

    it('POST renvoie status 400 et JSON d’erreur pour upstream 400', async () => {
        const erreur400 = {message: 'Requête invalide'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), {status: 400});

        const fakeReq = {json: async () => ({})} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(400);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(erreur400);
    });

    it('POST renvoie status 404 et JSON d’erreur pour upstream 404', async () => {
        const erreur404 = {message: 'Ressource non trouvée'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur404), {status: 404});

        const fakeReq = {json: async () => ({})} as unknown as Request;
        const res = await POST(fakeReq);
        expect(res.status).toBe(404);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(erreur404);
    });
});
