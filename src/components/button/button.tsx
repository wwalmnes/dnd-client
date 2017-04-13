import * as React from 'react';

interface IButton {
	title: string,
	classNames: string,
	textClassNames: string
	isDisabled: boolean,
	buttonTrigger(): any
};

const Button = ({title, classNames, textClassNames, isDisabled, buttonTrigger}:IButton) => {
	return (
		<button
			className={classNames}
			onClick={buttonTrigger}
		>
			<span className={textClassNames}>{title}</span>
		</button>
	);
};

export default Button;