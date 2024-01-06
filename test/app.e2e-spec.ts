import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({whitelist:true,forbidNonWhitelisted:true,transform:true})
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome');
  });

  describe("/movies",()=>{

    it('GET',()=>{
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST',()=>{
      return request(app.getHttpServer()).post('/movies').send({
        title:'test',
        year:2000,
        genres:['test'],
      }).expect(201);
    });

    it("DELETE",()=>{
      return request(app.getHttpServer()).delete('/movies').expect(404)
    })
  });

  describe('movies/:id', ()=>{
    it("GET 200",()=>{
      return request(app.getHttpServer()).get("/movie/1").expect(200)
    });
    it.todo("DELETE");
    it.todo("PATCH");

  })
});
