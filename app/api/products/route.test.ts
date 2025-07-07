import fetchMock from 'jest-fetch-mock';
import {GET} from './route';
import type {Product} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – produits', () => {
    const produitsMock: Product[] = [
        {
            id: 'p1',
            name: 'Produit 1',
            description_short: 'Desc courte',
            description_long: 'Desc longue',
            price: 19.99,
            currency: 'EUR',
            stock: 100,
            category: 'cat1',
            weight: 500,
            images: ['img1.jpg']
        }
    ];

    it('GET renvoie la liste des produits et status 200 pour upstream 200', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(produitsMock), {status: 200});

        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get('content-type')).toBe('application/json');
        expect(await res.json()).toEqual(produitsMock);
    });

    it('GET renvoie la liste des produits et status 200 pour upstream 201', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(produitsMock), {status: 201});

        const res = await GET();
        // tout code 2xx pondéré ok
        expect(res.status).toBe(200);
        expect(res.headers.get('content-type')).toBe('application/json');
        expect(await res.json()).toEqual(produitsMock);
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 400', async () => {
        fetchMock.mockResponseOnce('', {status: 400});

        const res = await GET();
        expect(res.status).toBe(500);
        const error = await res.json();
        expect(error).toEqual({erreur: 'Impossible de récupérer les produits'});
    });

    it('GET renvoie status 500 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET();
        expect(res.status).toBe(500);
        const error = await res.json();
        expect(error).toEqual({erreur: 'Impossible de récupérer les produits'});
    });

    it('GET renvoie status 502 et message réseau pour une exception fetch', async () => {
        fetchMock.mockRejectOnce(new Error('network failure'));

        const res = await GET();
        expect(res.status).toBe(502);
        const error = await res.json();
        expect(error).toEqual({erreur: 'Erreur réseau vers JSON-Server'});
    });
});
