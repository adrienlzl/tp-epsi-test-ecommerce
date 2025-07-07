import fetchMock from 'jest-fetch-mock';
import type {NextRequest} from 'next/server';
import {GET, PATCH} from './route';
import type {Product} from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – produit par ID (GET)', () => {
    const context = {params: Promise.resolve({productId: 'p1'})};

    const productMock: Product = {
        id: 'p1',
        name: 'Produit 1',
        description_short: 'Desc courte',
        description_long: 'Desc longue',
        price: 9.99,
        currency: 'EUR',
        stock: 5,
        category: 't-shirt',
        weight: 200,
        images: ['img1.jpg']
    };

    it('renvoie 200 et le produit pour upstream 200', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(productMock), {status: 200});

        const res = await GET({} as NextRequest, context);
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
        expect(await res.json()).toEqual(productMock);
    });

    it('renvoie 200 et le produit pour upstream 201', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(productMock), {status: 201});

        const res = await GET({} as NextRequest, context);
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(productMock);
    });

    it('renvoie 500 et message d’erreur pour upstream 400', async () => {
        fetchMock.mockResponseOnce('', {status: 400});

        const res = await GET({} as NextRequest, context);
        expect(res.status).toBe(500);
        expect(await res.json()).toEqual({erreur: 'Erreur lors de la récupération du produit'});
    });

    it('renvoie 404 et message d’erreur pour upstream 404', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const res = await GET({} as NextRequest, context);
        expect(res.status).toBe(404);
        expect(await res.json()).toEqual({erreur: 'Produit non trouvé'});
    });
});

describe('API – mise à jour stock (PATCH)', () => {
    const params = {params: {productId: 'p1'}};

    const productMock: Product = {
        id: 'p1',
        name: 'Produit 1',
        description_short: 'Desc courte',
        description_long: 'Desc longue',
        price: 9.99,
        currency: 'EUR',
        stock: 5,
        category: 't-shirt',
        weight: 200,
        images: ['img1.jpg']
    };

    it('renvoie 200 et l’objet mis à jour pour upstream PUT 200', async () => {
        const delta = 3;
        const updated = {...productMock, stock: productMock.stock + delta};

        fetchMock.mockResponses(
            [JSON.stringify(productMock), {status: 200}],  // GET current product
            [JSON.stringify(updated), {status: 200}]   // PUT updated product
        );

        const fakeReq = {json: async () => ({stockDelta: delta})} as unknown as Request;
        const res = await PATCH(fakeReq, params);
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(updated);
    });

    it('renvoie 201 et l’objet mis à jour pour upstream PUT 201', async () => {
        const delta = -2;
        const updated = {...productMock, stock: productMock.stock + delta};

        fetchMock.mockResponses(
            [JSON.stringify(productMock), {status: 200}],
            [JSON.stringify(updated), {status: 201}]
        );

        const fakeReq = {json: async () => ({stockDelta: delta})} as unknown as Request;
        const res = await PATCH(fakeReq, params);
        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(updated);
    });

    it('renvoie 400 et JSON d’erreur pour upstream PUT 400', async () => {
        const delta = 1;
        const err = {message: 'Requête invalide'};

        fetchMock.mockResponses(
            [JSON.stringify(productMock), {status: 200}],
            [JSON.stringify(err), {status: 400}]
        );

        const fakeReq = {json: async () => ({stockDelta: delta})} as unknown as Request;
        const res = await PATCH(fakeReq, params);
        expect(res.status).toBe(400);
        expect(await res.json()).toEqual(err);
    });

    it('renvoie 404 et JSON d’erreur pour upstream PUT 404', async () => {
        const delta = 1;
        const err = {message: 'Produit introuvable'};

        fetchMock.mockResponses(
            [JSON.stringify(productMock), {status: 200}],
            [JSON.stringify(err), {status: 404}]
        );

        const fakeReq = {json: async () => ({stockDelta: delta})} as unknown as Request;
        const res = await PATCH(fakeReq, params);
        expect(res.status).toBe(404);
        expect(await res.json()).toEqual(err);
    });
});
