
import { reservaCreatorController, reservaDeleteController, reservaFindAllController, reservaFindAllFreeHabitacionesController, reservaUpdateController } from '@reserva/controllers';
import { reservaCreatorValidator } from '@reserva/validators/reservaCreator.validator';
import { reservaDeleteValidator } from '@reserva/validators/reservaDelete.validator';
import { reservaFindAllFreeHabitacionesValidator } from '@reserva/validators/reservaFindAllFreeHabitaciones.validator';
import { reservaUpdateValidator } from '@reserva/validators/reservaUpdate.validator';
import express from 'express';

const baseReservaRouter = express.Router();


baseReservaRouter.get('/', 
    reservaFindAllController.handle.bind(reservaFindAllController)
);

baseReservaRouter.get('/free-habitaciones',
    reservaFindAllFreeHabitacionesValidator,
    reservaFindAllFreeHabitacionesController.handle.bind(reservaFindAllFreeHabitacionesController)
); 

baseReservaRouter.post('/', 
    reservaCreatorValidator,
    reservaCreatorController.handle.bind(reservaCreatorController)
);

baseReservaRouter.put('/', 
    reservaUpdateValidator,
    reservaUpdateController.handle.bind(reservaUpdateController)
);


baseReservaRouter.delete('/', 
    reservaDeleteValidator,
    reservaDeleteController.handle.bind(reservaDeleteController)
);




export default baseReservaRouter;