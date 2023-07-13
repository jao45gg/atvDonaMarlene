import httpStatus from "http-status";
import app from "../src/app";
import supertest from "supertest";

const server = supertest(app);

describe(" api tests", () => {
    it("should respond with 201 when inserting a fruit", async () => {
        const { status } = await server.post("/fruits").send({ "name": "eaeblz", "price": 2 });
        expect(status).toBe(httpStatus.CREATED);
    });
    it("should return 409 when inserting a fruit that is already registered", async () => {
        const { status } = await server.post("/fruits").send({ "name": "eaeblz", "price": 2 });
        expect(status).toBe(httpStatus.CONFLICT);
    });
    it("should return 422 when inserting a fruit with data missing", async () => {
        const { status } = await server.post("/fruits");
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("shoud return 404 when trying to get a fruit that doesn't exists", async () => {
        const { status } = await server.get("/fruits/999");
        expect(status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 400 when id param is not valid", async () => {
        const { status } = await server.get("/fruits/f");
        expect(status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should return a fruit given an id", async () => {
        const { body } = await server.get("/fruits/1");
        expect(body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number)
        })
    });
    it("should return all fruits", async () => {
        const { body } = await server.get("/fruits");
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    });
});