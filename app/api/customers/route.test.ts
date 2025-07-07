import fetchMock from 'jest-fetch-mock';
import {GET, POST} from './route';
import type {Customer} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – clients', () => {
    // --- GET ---

    it('GET renvoie la liste des clients et status 200 pour upstream 200', async () => {
        const clientsMock: Customer[] = [
            {
                id: 'c1',
                name: 'Dupont',
                email: 'dupont@example.com',
                defaultShippingAddressId: null,
                defaultBillingAddressId: null
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(clientsMock), {status: 200});

        const response = await GET();
        expect(response.status).toBe(200);
        expect(response.headers.get('Content-Type')).toBe('application/json');

        const data = await response.json();
        expect(data).toEqual(clientsMock);
    });

    it('GET renvoie la liste des clients et status 200 pour upstream 201', async () => {
        const clientsMock: Customer[] = [
            {
                id: 'c2',
                name: 'Martin',
                email: 'martin@example.com',
                defaultShippingAddressId: 'addr1',
                defaultBillingAddressId: 'addr2'
            }
        ];
        fetchMock.mockResponseOnce(JSON.stringify(clientsMock), {status: 201});

        const response = await GET();
        expect(response.status).toBe(200);
        expect(response.headers.get('Content-Type')).toBe('application/json');

        const data = await response.json();
        expect(data).toEqual(clientsMock);
    });

    it('GET renvoie status 400 et le texte brut pour upstream 400', async () => {
        fetchMock.mockResponseOnce('Bad Request', {status: 400});

        const response = await GET();
        expect(response.status).toBe(400);
        expect(response.headers.get('Content-Type')).toBe('text/plain');

        const text = await response.text();
        expect(text).toBe('Bad Request');
    });

    it('GET renvoie status 404 et le texte brut pour upstream 404', async () => {
        fetchMock.mockResponseOnce('Not Found', {status: 404});

        const response = await GET();
        expect(response.status).toBe(404);
        expect(response.headers.get('Content-Type')).toBe('text/plain');

        const text = await response.text();
        expect(text).toBe('Not Found');
    });

    // --- POST ---

    it('POST crée un client et renvoie status 201 pour upstream 200', async () => {
        const nouveauClient = {
            name: 'Durand',
            email: 'durand@example.com',
            defaultShippingAddressId: null,
            defaultBillingAddressId: null
        };
        const upstreamResponse: Customer = {
            id: 'c3',
            ...nouveauClient
        };
        fetchMock.mockResponseOnce(JSON.stringify(upstreamResponse), {status: 200});

        const fakeReq = {json: async () => nouveauClient} as unknown as Request;
        const response = await POST(fakeReq);
        expect(response.status).toBe(201);
        expect(response.headers.get('Content-Type')).toBe('application/json');

        const data = await response.json();
        expect(data).toEqual(upstreamResponse);
    });

    it('POST crée un client et renvoie status 201 pour upstream 201', async () => {
        const nouveauClient = {
            name: 'Leroux',
            email: 'leroux@example.com',
            defaultShippingAddressId: 'addr3',
            defaultBillingAddressId: null
        };
        const upstreamResponse: Customer = {
            id: 'c4',
            ...nouveauClient
        };
        fetchMock.mockResponseOnce(JSON.stringify(upstreamResponse), {status: 201});

        const fakeReq = {json: async () => nouveauClient} as unknown as Request;
        const response = await POST(fakeReq);
        expect(response.status).toBe(201);
        expect(response.headers.get('Content-Type')).toBe('application/json');

        const data = await response.json();
        expect(data).toEqual(upstreamResponse);
    });

    it('POST renvoie status 400 et texte brut pour upstream 400', async () => {
        fetchMock.mockResponseOnce('Bad Request', {status: 400});

        const fakeReq = {json: async () => ({})} as unknown as Request;
        const response = await POST(fakeReq);
        expect(response.status).toBe(400);
        expect(response.headers.get('Content-Type')).toBe('text/plain');

        const text = await response.text();
        expect(text).toBe('Bad Request');
    });

    it('POST renvoie status 404 et texte brut pour upstream 404', async () => {
        fetchMock.mockResponseOnce('Not Found', {status: 404});

        const fakeReq = {json: async () => ({})} as unknown as Request;
        const response = await POST(fakeReq);
        expect(response.status).toBe(404);
        expect(response.headers.get('Content-Type')).toBe('text/plain');

        const text = await response.text();
        expect(text).toBe('Not Found');
    });
});
