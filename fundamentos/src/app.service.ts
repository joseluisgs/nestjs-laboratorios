import { Injectable } from '@nestjs/common';

// Provider de la clase AppService
// Se usa el decorador @Injectable() para definir el provider
// Se define el servicio
// Se exporta la clase para que pueda ser usada por otros módulos
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
