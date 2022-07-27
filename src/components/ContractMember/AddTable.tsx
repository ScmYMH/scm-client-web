import React from 'react';
import { Button, Table } from 'reactstrap';

function AddTable() {
	console.log('행추가 기능을 위해 들어옴');
	return (
		<tr>
			<td>
				<input type={'checkbox'}></input>
			</td>
			<td>
				<input></input>
				<Button>조회</Button>
			</td>
			<td>
				<input></input>
				<Button>조회</Button>
			</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	);
}
console.log('행추가 기능을 위해 들어옴');
export default AddTable;
