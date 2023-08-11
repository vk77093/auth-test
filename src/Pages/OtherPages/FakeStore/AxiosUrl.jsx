import axios from "axios";

export const FakeStoreApi=axios.create({
    baseURL:'https://fakestoreapi.com/',
});

//we can create multiple api endpoints