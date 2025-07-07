import fetchMock from 'jest-fetch-mock';
import { GET } from './route';
import type { Carrier } from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – transporteurs', () => {
    const transporteursMock: Carrier[] = [
        {
            id: 'c1',
            name: 'Transporteur1',
            service_type: 'Express',
            area_served: 'National',
            average_rating: 4.7,
            'max-weight': 100,
            contact_email: 't1@example.com',
            phone: '0123456789',
            tracking_url_template: 'http://track/{tracking_number}',
            features: ['rapide']
        }
    ];

    it('GET doit renvoyer la liste des transporteurs pour un upstream 200', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(transporteursMock), { status: 200 });

        const response = await GET();
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(transporteursMock);
    });

    it('GET doit renvoyer la liste des transporteurs pour un upstream 201', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(transporteursMock), { status: 201 });

        const response = await GET();
        // fetch.ok est vrai pour 2xx, donc on renvoie toujours 200
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(transporteursMock);
    });

    it('GET renvoie une erreur 500 pour un upstream 400', async () => {
        fetchMock.mockResponseOnce('', { status: 400 });

        const response = await GET();
        expect(response.status).toBe(500);

        const data = await response.json();
        expect(data).toEqual({ erreur: 'Impossible de récupérer les transporteurs' });
    });

    it('GET renvoie une erreur 500 pour un upstream 404', async () => {
        fetchMock.mockResponseOnce('', { status: 404 });

        const response = await GET();
        expect(response.status).toBe(500);

        const data = await response.json();
        expect(data).toEqual({ erreur: 'Impossible de récupérer les transporteurs' });
    });
});
