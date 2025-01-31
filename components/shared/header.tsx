import React from 'react';

type Props = {
	title: String;
	subtitle?: string;
};
const Header = ({ title, subtitle }: Props) => {
	return (
		<>
			<h2 className="h2-bold text-foreground">{title}</h2>
			{subtitle && <p className="p-16-regular mt-4">{subtitle}</p>}
		</>
	);
};

export default Header;
