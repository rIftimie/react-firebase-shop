import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { editarPieza, guardar } from '../helpers/acceso-firebase';

function GuardarPiezas({ statePieza, stateEditar }) {
	const { register, handleSubmit, setValue, reset } = useForm();

	if (stateEditar.editar) {
		setValue('name', stateEditar.editar.data.name);
		setValue('price', stateEditar.editar.data.price);
		setValue('valoracion', stateEditar.editar.data.valoracion);
	}

	async function handleEditar(item) {
		// actualizar en cliente
		statePieza.setPieza(
			statePieza.pieza.map((pieza) => {
				if (pieza.id == item.id) {
					pieza.data = item.data;
				}
				return pieza;
			})
		);

		// actualizar en servidor
		await editarPieza(item);
	}
	async function handleAgregar(item) {
		//añadir en servidor
		const objId = await guardar(item);

		//añadir en cliente
		statePieza.setPieza(statePieza.pieza.concat({ id: objId, data: item }));
	}
	function onSubmit(formData) {
		if (!stateEditar.editar) {
			// guardar nuevo objeto.
			handleAgregar(formData);
		} else {
			// editar objeto ya existente.
			handleEditar({ id: stateEditar.editar.id, data: formData });

			// reiniciamos el formulario y la variable.
			stateEditar.setEditar(null);
			reset();
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Name</Form.Label>
					<Form.Control {...register('name')} type="text" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Precio</Form.Label>
					<Form.Control {...register('price')} type="text" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Label>Valoracion</Form.Label>
					<Form.Control {...register('valoracion')} type="text" />
				</Form.Group>
				<Button variant="primary" type="submit">
					{stateEditar.editar ? 'Editar' : 'Guardar'}
				</Button>
			</Form>
		</>
	);
}

export default GuardarPiezas;
