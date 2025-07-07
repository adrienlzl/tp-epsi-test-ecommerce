import fetchMock from 'jest-fetch-mock';
import {GET} from './route';
import type {OrderItem} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – élément de commande par ID', () => {
    const fakeReq = {} as Request;
    const context = {params: {id: 'oi1'}};

    it('GET renvoie l’élément de commande et status 200 pour upstream 200', async () => {
        const itemMock: OrderItem = {
            id: 'oi1',
            orderId: 'o1',
            productId: 'p1',
            quantity: 2,
            unitPrice: 10,
            totalPrice: 20
        };
        fetchMock.mockResponseOnce(JSON.stringify(itemMock), {status: 200});

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(itemMock);
    });

    it('GET renvoie l’élément de commande et status 200 pour upstream 201', async () => {
        const itemMock: OrderItem = {
            id: 'oi2',
            orderId: 'o2',
            productId: 'p2',
            quantity: 5,
            unitPrice: 8,
            totalPrice: 40
        };
        fetchMock.mockResponseOnce(JSON.stringify(itemMock), {status: 201});

        const res = await GET(fakeReq, context);
        // Seul le 404 est géré en erreur, tout autre statut non-404 passe en 200
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(itemMock);
    });

    it('GET renvoie status 200 et JSON d’erreur pour upstream 400', async () => {
        const erreur400 = {message: 'Requête invalide'};
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), {status: 400});

        const res = await GET(fakeReq, context);
        // 400 upstream n’est pas 404, donc on renvoie 200 avec le body tel quel
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual(erreur400);
    });

    it('GET renvoie status 404 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(404);
        expect(res.headers.get('Content-Type')).toBe('application/json');

        const data = await res.json();
        expect(data).toEqual({erreur: 'Élément de commande non trouvé'});
    });
});
