import fetchMock from 'jest-fetch-mock';
import { GET } from './route';
import type { Customer } from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – client par ID', () => {
    const fakeReq = {} as Request;
    const context = { params: { id: 'c1' } };

    it('GET renvoie le client et status 200 pour upstream 200', async () => {
        const clientMock: Customer = {
            id: 'c1',
            name: 'Durand',
            email: 'durand@example.com',
            defaultShippingAddressId: null,
            defaultBillingAddressId: null
        };
        fetchMock.mockResponseOnce(JSON.stringify(clientMock), { status: 200 });

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(clientMock);
    });

    it('GET renvoie le client et status 200 pour upstream 201', async () => {
        const clientMock: Customer = {
            id: 'c2',
            name: 'Martin',
            email: 'martin@example.com',
            defaultShippingAddressId: 'addr1',
            defaultBillingAddressId: 'addr2'
        };
        fetchMock.mockResponseOnce(JSON.stringify(clientMock), { status: 201 });

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(clientMock);
    });

    it('GET renvoie un JSON d’erreur et status 200 pour upstream 400', async () => {
        const erreur400 = { message: 'Requête invalide' };
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), { status: 400 });

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(erreur400);
    });

    it('GET renvoie status 404 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', { status: 404 });

        const res = await GET(fakeReq, context);
        expect(res.status).toBe(404);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual({ erreur: 'Client non trouvé' });
    });
});