/**
 * app/api/carriers/[id]/route.test.ts
 */
import fetchMock from 'jest-fetch-mock';
import { GET } from './route';
import type { Carrier } from '@/lib/interfaces/interface';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('API – transporteur par ID', () => {
    const fakeReq = {} as Request;
    const context = { params: { id: 'c1' } };

    it('GET doit renvoyer le transporteur et status 200 pour un upstream 200', async () => {
        const carrierMock: Carrier = {
            id: 'c1',
            name: 'Expresstrack',
            service_type: 'Express',
            area_served: 'National',
            average_rating: 4.5,
            'max-weight': 50,
            contact_email: 'contact@expresstrack.com',
            phone: '0123456789',
            tracking_url_template: 'https://track/{tracking_number}',
            features: ['rapide', 'suivi 24h']
        };
        fetchMock.mockResponseOnce(JSON.stringify(carrierMock), { status: 200 });

        const response = await GET(fakeReq, context);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(carrierMock);
    });

    it('GET doit renvoyer le transporteur et status 200 pour un upstream 201', async () => {
        const carrierMock: Carrier = {
            id: 'c1',
            name: 'LivraisonPlus',
            service_type: 'Standard',
            area_served: 'International',
            average_rating: 4.0,
            'max-weight': 100,
            contact_email: 'info@livraisonplus.com',
            phone: '0987654321',
            tracking_url_template: 'https://trackplus/{tracking_number}',
            features: ['économique']
        };
        fetchMock.mockResponseOnce(JSON.stringify(carrierMock), { status: 201 });

        const response = await GET(fakeReq, context);
        // tout code ≠404 est traité comme succès
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(carrierMock);
    });

    it('GET doit renvoyer status 200 et JSON d’erreur upstream pour un upstream 400', async () => {
        const erreur400 = { message: 'Requête invalide' };
        fetchMock.mockResponseOnce(JSON.stringify(erreur400), { status: 400 });

        const response = await GET(fakeReq, context);
        // seul 404 est géré à part, ici on parse et renvoie 200
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(erreur400);
    });

    it('GET doit renvoyer status 404 et message d’erreur pour un upstream 404', async () => {
        fetchMock.mockResponseOnce('', { status: 404 });

        const response = await GET(fakeReq, context);
        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({ erreur: 'Transporteur non trouvé' });
    });
});
