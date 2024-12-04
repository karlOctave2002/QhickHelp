import { Observable, of } from "rxjs"
import { Clima } from "./clima.interfaces"
import { mockClima } from "../mocks/wheater.mocks"

export const ApiServiceMock:{
    obtenerPersonajes: () => Observable<Clima>
} = {
    obtenerPersonajes: () => of(mockClima),
}