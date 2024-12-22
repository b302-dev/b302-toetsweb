import {FunctionComponent, ReactNode} from "react";
import {ClassBuilder} from "../../utils/ClassBuilder";
import {LinkProps, NavLink} from 'react-router-dom'


interface Props extends Omit<LinkProps, 'children'> {
	variant?: 'primary' | 'styless'
	children: ReactNode | ReactNode[]
}

const ButtonAnchor: FunctionComponent<Props> = ({variant = 'primary', className, children, ...rest}) => {

	const classNames = new ClassBuilder('button-anchor')
		.add(`button-anchor--${variant}`)
		.addIf(className, className)
		.build();

	const hasMultipleChildren = children instanceof Array;

	return (
		<NavLink className={classNames} {...rest}>
			{
				hasMultipleChildren
					? <div className={'button-anchor--content'}>{children}</div>
					: children
			}
		</NavLink>
	)
}

export default ButtonAnchor;
