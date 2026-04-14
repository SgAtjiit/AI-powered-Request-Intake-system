import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import {
  REQUEST_CATEGORIES,
  REQUEST_URGENCIES,
} from '../src/requests/schemas/request.schema';

describe('request triage configuration', () => {
  it('keeps the allowed category values aligned with the API contract', () => {
    expect(REQUEST_CATEGORIES).toEqual([
      'billing',
      'support',
      'feedback',
      'general',
    ]);
  });

  it('keeps the allowed urgency values aligned with the API contract', () => {
    expect(REQUEST_URGENCIES).toEqual(['low', 'medium', 'high']);
  });
});

describe('GET /', () => {
  it('returns the live status message', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('server is live!!');

    await app.close();
  });
});
