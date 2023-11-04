const request = require('supertest');
const app = require('../app');


describe('Films API routes', () => {
  it('should fetch a movie by title', async () => {
    const title = 'Inception';
    const response = await request(app).get(`/api/film/${title}`);
    expect(response.statusCode).toBe(200, `Expected status code 200 when fetching movie '${title}', but got ${response.statusCode}.`);
    expect(response.body.Title).toBe(title, `Expected movie title to be '${title}', but got '${response.body.title}'.`);
  });

  it('should return 404 for a non-existent movie', async () => {
    const title = 'NonExistentMovie12345';
    const response = await request(app).get(`/api/film/${title}`);
    expect(response.statusCode).toBe(404, `Expected status code 404 for a non-existent movie '${title}', but got ${response.statusCode}.`);
    expect(response.body.message).toBe('Film not found', `Expected error message 'Film not found', but got '${response.body.message}'.`);
  });

  it('should add a new movie', async () => {
    const movie = {
      title: 'Test Movie',
      author: 'Test Author',
      description: 'Test Description',
      src: 'test.png'
    };
    const response = await request(app).post('/api/film/').send(movie);
    expect(response.statusCode).toBe(200, `Expected status code 200 when adding a new movie, but got ${response.statusCode}.`);
    expect(response.body.message).toBe(`Se ha guardado ${movie.title}`, `Expected confirmation message for adding movie '${movie.title}', but got a different message.`);
  });

  it('should update an existing movie', async () => {
    const updatedMovie = {
      id: 123,
      title: 'Updated Test Movie',
      author: 'Updated Test Author',
      description: 'Updated Test Description',
      src: 'updated_test.png'
    };
    const response = await request(app).put('/api/film/').send(updatedMovie);
    expect(response.statusCode).toBe(200, `Expected status code 200 when updating a movie, but got ${response.statusCode}.`);
    expect(response.body.message).toBe(`Se ha actualizado ${updatedMovie.title}`, `Expected confirmation message for updating movie '${updatedMovie.title}', but got a different message.`);
  });

  it('should delete an existing movie', async () => {
    const movie = {
      id: 123
    };
    const response = await request(app).delete('/api/film/').send(movie);
    expect(response.statusCode).toBe(200, `Expected status code 200 when deleting a movie, but got ${response.statusCode}.`);
    expect(response.body.message).toBe(`Se ha borrado la película con ID: ${movie.id}`, `Expected confirmation message for deleting movie with ID '${movie.id}', but got a different message.`);
  });
});
