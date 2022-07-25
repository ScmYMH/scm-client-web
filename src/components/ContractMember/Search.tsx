import React from 'react';

function Search({}) {
	const handleSubmit = () => {
		//event.preventDefault();
		//onSubmit(event.target.elements.filter.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="filter" />
			<button>Search</button>
		</form>
	);
}

export default Search;
